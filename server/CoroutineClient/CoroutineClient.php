<?php
/**
 * Created by PhpStorm.
 * User: htpc
 * Date: 2018/9/27
 * Time: 9:23
 */

namespace server\CoroutineClient;


use Noodlehaus\Config;
use server\Client\ClientParams;
use server\Client\Pack;
use server\Exception\ClientException;
use server\Log\Log;

class CoroutineClient {

	public static $pool =[];
	public static $instance;
	public $config;

	protected function __construct()
	{
		$this->getConfig();
	}

	public function getConfig()
	{
		$this->config = new Config(getConfigPath());
	}

	public static function instance()
	{
		if(!self::$instance){
			self::$instance = new self();
		}
		return self::$instance;
	}

	public function send($params)
	{
		$host = $this->config['TCPserver']['server.host'];
		$port = $this->config['TCPserver']['server.port'];
		$client = $this->get($host,$port);
		$clientParam             = ClientParams::instance();
		if(!isset($params[0])){
			return false;
		}
		$clientParam->method     = $params[0];
		$clientParam->callParams = $params;
		$clientParam->request_id = getRequestId();
		$sendData           = Pack::sendEncode( Pack::encode( serialize($clientParam) ) );
		$client->send($sendData);
		$res = $client->recv();
		if(empty($res)){
		   return  $this->send($params);
		}
		$this->put($client,$host,$port);
		$data = unserialize( Pack::decode( Pack::decodeData( $res ) ) );
		if($data instanceof  ClientParams){
			if ( ! is_null( $data->exception_message ) ) {
				throw new ClientException( $data->exception_message, $data->exception_code );
			}
			unset( $res );
			return $data->result;
		}
	}

	/**
	 * 回收链接
	 * @param $client
	 * @param $host
	 * @param $port
	 */
	public function put($client,$host,$port)
	{
		$key = $this->clientKey($host,$port);
		self::$pool[$key][] = $client;
	}

	/**
	 * @param $host
	 * @param $port
	 *
	 * @return mixed|\Swoole\Coroutine\Client
	 * @throws \server\Exception\ClientException
	 */
	public function get($host,$port)
	{
		//有空闲连接
		$key = $this->clientKey($host,$port);
		if (isset(self::$pool[$key]) && count(self::$pool[$key]) > 0) {
			$client =  array_shift(self::$pool[$key]);
			if(!$client->isConnected()){
				unset($client);
				$client = $this->get($host,$port);
			}
		}else{
			//无空闲连接，创建新连接
			$client = new \Swoole\Coroutine\Client(SWOOLE_SOCK_TCP);
			$config = [
				'open_length_check'     => true,
				'package_length_type'   => 'N',
				'package_max_length'    => 1024*1024*4,//10M
				'package_body_offset'   => 4,
				'package_length_offset' => 0,
			];
			$client->set($config);
			$res = $client->connect($host, $port,-1);
			if ($res === false) {
				throw new ClientException('协程链接服务器错误',$client->errCode);
			} else {
				Log::log('协程链接成功');
			}
		}
		return $client;
	}

	/**
	 * 获取key
	 * @param $host
	 * @param $port
	 *
	 * @return string
	 */
	public function clientKey( $host, $port ) {
		return md5(  $host . $port );
	}
}