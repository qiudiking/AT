<?php
/**
 * Created by PhpStorm.
 * User: htpc
 * Date: 2018/10/9
 * Time: 15:57
 */

namespace server\YafController;


class YafController extends \Yaf\Controller_Abstract
{

	/**
	 * @var \server\Result\Result
	 */
	public $result;

	public function init()
	{
		$this->result = \server\Result\Result::Instance();
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
			\server\server\HttpServer::$response->redirect($url);
		}
		$exception =   new \server\Exception\RedirectException($msg);
		$exception->setRedirect_url($url);
		throw $exception;
	}

	/**
	 * 同步调用
	 * @throws \server\Exception\ClientException
	 */
	public function invoke()
	{
		$params = func_get_args();
		if($params){
			return \server\Client\Client::instance()->invokeTcp($params);
		}
	}

	/**
	 * 异步调用  最后一个参数是函数的，将做异步回调
	 */
	public function invokeAsync()
	{
		$params = func_get_args();
		if($params){
			\server\Client\Client::instance()->invokeAsync($params);
		}
	}

	/**
	 * 异步请求TCP服务 并自动http响应
	 */
	public function invokeAsyncResponse()
	{
		$params = func_get_args();
		if($params){
			\server\Client\Client::instance()->invokeAsyncResponse($params);
		}
	}

	/**
	 * 协程调用
	 * @return bool|null
	 * @throws \server\Exception\ClientException
	 */
	public function invokeCoroutine()
	{
		$params = func_get_args();
		if($params){
			return  \server\CoroutineClient\CoroutineClient::instance()->send($params);
		}
	}
}