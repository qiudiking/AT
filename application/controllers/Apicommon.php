<?php

/**
 * Class ApicommonController
 */
class ApicommonController extends Yaf\Controller_Abstract
{
	/**
	 * @var server\Result\Result
	 */
	public $result;

	public function init()
	{
		$this->result = \server\Result\Result::Instance();
	}

	/**
	 * 同步调用
	 * @throws \server\Exception\ClientException
	 */
	public function invoke()
	{
		$params = func_get_args();
		if($params){
			\server\Client\Client::instance()->invokeTcp($params);
		}
	}

	/**
	 * 异步调用 最后一个参数是函数的，将做异步回调
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
	 * 协程调用TCP服务
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