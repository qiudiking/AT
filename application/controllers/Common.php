<?php
/**
 * Created by PhpStorm.
 * User: htpc
 * Date: 2018/8/25
 * Time: 11:02
 */

class CommonController extends Yaf\Controller_Abstract
{
	/**
	 * 301重定向 url跳转
	 * @param string $url
	 *
	 * @return bool|void
	 * @throws \Exception
	 */
	public function redirect( $url ) {
		\server\server\HttpServer::$response->redirect($url);
		throw  new Exception('301redirect',301);
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