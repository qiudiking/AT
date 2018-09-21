<?php
/**
 * Created by PhpStorm.
 * User: htpc
 * Date: 2018/8/11
 * Time: 10:58
 */

namespace server\server;




use server\Log\Log;
use server\Result\Result;
use Symfony\Component\Console\Style\SymfonyStyle;

class HttpServer extends SwooleServer {
	/**
	 *php代码执行过程中发生错误
	 */
	public static function handleFatal(){
		$error = handleFatal();
		if(self::$response){
			Log::error($error);
			$json = Result::Instance();
			$json->setCodeMsg( 'server error', 500 );
			self::$response->status( 500 );
			self::$response->end( $json->getJson() );
		}
	}

	/**
	 * @var \swoole_http_response
	 */
	public static $response;
	/**
	 * @var \Yaf\Application
	 */
	public $app;
	/**
	 * 响应
	 * @var bool
	 */
	public $isResponse = true;
	/**
	 * @var \swoole_http_server
	 */
	public static $serverInstance;
	/**
	 * @var \server\server\HttpServer
	 */
	public static $instance;

	public static function getInstance()
	{
		return self::$instance;
	}

	/**
	 * @param \swoole_http_request  $request
	 * @param \swoole_http_response $response
	 *
	 * @return bool
	 */
	public function onRequest(\swoole_http_request $request ,\swoole_http_response $response)
	{

		self::$response = $response;
		$_GET         = isset( $request->get ) ? $request->get : array();
		$_POST        = isset( $request->post ) ? $request->post : array();
		$_COOKIE      = isset( $request->cookie ) ? $request->cookie : array();
		$_FILES       = isset( $request->files ) ? $request->files : array();
		//清理环境
		//将请求的一些环境参数放入全局变量桶中
		$_SERVER             = isset( $request->server ) ? $request->server : array();
		$header              = isset( $request->header ) ? $request->header : array();
		$_SESSION     = array();
		$this->isSendContent = true;
		foreach ( $_SERVER as $key => $value ) {
			unset( $_SERVER[ $key ] );
			$_SERVER[ strtoupper( $key ) ] = $value;
		}
		foreach ( $header as $key => $value ) {
			unset( $_SERVER[ $key ] );
			$_SERVER[ strtoupper( $key ) ] = $value;
		}
		$_SERVER['SWOOLE_WORKER_ID'] = $this->server->worker_id;
		if ( ! isset( $_SERVER['HTTP_HOST'] ) ) {
			$arr                  = explode( ':', $_SERVER['HOST'] );
			$_SERVER['HTTP_HOST'] = getArrVal( 0, $arr );
		}
		isset( $_SERVER['HTTP_REQUEST_ID'] ) || $_SERVER['HTTP_REQUEST_ID'] = getRandChar( 28 );
		if($_SERVER['REQUEST_URI'] == '/favicon.ico'){
			$response->end('');
			return true;
		}

		ob_start();
		$response->header( 'Access-Control-Allow-Origin', '*' );
		$response->header( 'Access-Control-Allow-Credentials', 'true' );
		$response->header( 'Content-Type', 'text/html; charset=utf-8' );
		\Yaf\Registry::del( 'SWOOLE_HTTP_REQUEST' );
		\Yaf\Registry::del( 'SWOOLE_HTTP_RESPONSE' );
		//注册全局信息
		\Yaf\Registry::set( 'SWOOLE_HTTP_REQUEST', $request );
		\Yaf\Registry::set( 'SWOOLE_HTTP_RESPONSE', $response );
		try {
			$GLOBALS['HTTP_RAW_POST_DATA'] = $request->rawContent();
			$requestObj                    = new \Yaf\Request\Http( $_SERVER['REQUEST_URI'] );
			$this->app->bootstrap();
			$this->app->getDispatcher()->dispatch( $requestObj );;
		} catch ( \server\Exception\ActionSuccessException $actionErrorException ) {
			//成功处理控制器
			//echo 'success';
		} catch ( \server\Exception\ActionErrorException $actionErrorException ) {
			//错误控制器
			//echo 'error';
		} catch ( \Exception $e ) {
			$result_i = Result::Instance();
			$result_i->setCodeMsg($e->getMessage(),$e->getCode());
			Log::error('code=' . $e->getCode() . ' : ' . $e->getMessage() . $e->getTraceAsString() );
			echo $result_i;
		}
		$result = ob_get_contents();
		ob_end_clean();
		if($this->isResponse){
			$response->end($result);
		}
	}

	/**
	 * @param \swoole_http_server $server
	 * @param                     $worker_id
	 */
	public function onWorkerStart( $server, $worker_id)
	{
		$this->app = new \Yaf\Application( AT . "/conf/application.ini" );
		$objSamplePlugin = new \SamplePlugin();
		Log::log($this->serverName.'服务启动SUCCESS....');
		$this->app->getDispatcher()->registerPlugin( $objSamplePlugin );
		if(!$server->taskworker){
			$process_name = $this->set_process_name('Worker');
		}else{
			$process_name = $this->set_process_name('Task');
		}
		cli_set_process_title($process_name);
	}


	public static function sendContent(\swoole_http_response $response ,$content)
	{
		$response->header('Keep-Alive', 300 );
		$response->end($content);
	}


	/**
	 * @param \Symfony\Component\Console\Style\SymfonyStyle $oi
	 *
	 * @throws \Exception
	 */
	public  function start(SymfonyStyle $oi)
	{

		$config = $this->config['ports'][$this->serverName];
		$set = $this->config['server'][$this->serverName];
		self::$instance = $this;
		if($this->get_process_info()){
			$oi->warning($this->serverName.'服务已启动;端口:'.$config['socket_port']);
			return ;
		}
		$logPath = $this->config['log']['path'];
		Log::setPath($logPath);
		$this->server = new  \swoole_http_server($config['socket_host'],$config['socket_port']);
		self::$serverInstance = $this->server;
		$oi->success($this->serverName.'服务启动成功;端口:'.$config['socket_port']);
		Log::log($this->serverName.'服务启动');
		$this->server->set($set);
		$this->server->on( 'connect', array( $this, 'onConnect' ) );
		$this->server->on( 'workerStart', array( $this, 'onWorkerStart' ) );
		$this->server->on( 'Shutdown', array( $this, 'onShutdown' ) );
		$this->server->on( 'workerStop', array( $this, 'onWorkerStop' ) );
		$this->server->on( 'start', array( $this, 'onStart' ) );
		$this->server->on( 'workerError', array( $this, 'onWorkerError' ) );
		$this->server->on( 'ManagerStart', array( $this, 'onManagerStart' ) );
		$this->server->on( 'task', array( $this, 'onTask' ) );
		$this->server->on( 'finish', array( $this, 'onFinish' ) );
		$this->server->on( 'close', array( $this, 'onClose' ) );
		$this->server->on( 'request', array( $this, 'onRequest' ) );
		$this->server->on( 'pipeMessage', array( $this, 'onPipeMessage' ) );
		$this->server->start();
	}

}