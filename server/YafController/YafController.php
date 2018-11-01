<?php
/**
 * Created by PhpStorm.
 * User: htpc
 * Date: 2018/10/9
 * Time: 15:57
 */

namespace server\YafController;


use server\CoroutineClient\CoroutineContent;
use server\Exception\ErrorHandler;
use server\Exception\ThrowException;

class YafController extends \Yaf\Controller_Abstract
{
	/**
	 * @var \server\Result\Result
	 */
	protected $result;

	public function init()
	{
		if(isAjaxRequest()){
			$this->result = \server\Result\Result::Instance();
		}
	}



	/**
	 * 301重定向 url跳转
	 * @param string $url
	 *
	 * @return bool|void
	 * @throws \Exception
	 */
	public function redirect( $url ,$msg = '' ) {
		if(!isAjaxRequest()){
			$response = CoroutineContent::get('response');
			if($response instanceof \swoole_http_response){
				$response->redirect($url);
			}
		}
		$exception =   new \server\Exception\RedirectException($msg);
		$exception->setRedirect_url($url);
		throw $exception;
	}

	/**
	 * 同步调用
	 * @return bool|null
	 * @throws \server\Exception\ClientException
	 * @throws \server\Exception\ProvideException
	 */
	protected function invoke()
	{
		if(DFS){
			$params = func_get_args();
			if($params){
				return \server\Client\Client::instance()->invokeTcp($params);
			}
		}else{
			ThrowException::ProvideException(ErrorHandler::SERVERS_DFS_FAIL);
		}
	}

	/**
	 * 异步调用  最后一个参数是函数的，将做异步回调
	 * @throws \server\Exception\ProvideException
	 */
	protected function invokeAsync()
	{
		if(DFS){
			$params = func_get_args();
			if($params){
				\server\Client\Client::instance()->invokeAsync($params);
			}
		}else{
			ThrowException::ProvideException(ErrorHandler::SERVERS_DFS_FAIL);
		}
	}

	/**
	 * 异步请求TCP服务 并自动http响应
	 * @throws \server\Exception\ClientException
	 * @throws \server\Exception\ProvideException
	 */
	protected function invokeAsyncResponse()
	{
		if(DFS){
			$params = func_get_args();
			if($params){
				\server\Client\Client::instance()->invokeAsyncResponse($params);
			}
		}else{
			ThrowException::ProvideException(ErrorHandler::SERVERS_DFS_FAIL);
		}
	}

	/**
	 * 协程调用 暂时不能用
	 * @return null
	 * @throws \server\Exception\ClientException
	 * @throws \server\Exception\ProvideException
	 */
	protected function invokeCoroutine()
	{
		if(DFS){
			$params = func_get_args();
			if($params){
				\server\CoroutineClient\CoroutineClient::instance()->putGlobal();
				return  \server\CoroutineClient\CoroutineClient::instance()->send($params);
			}
		}else{
			ThrowException::ProvideException(ErrorHandler::SERVERS_DFS_FAIL);
		}
	}
}