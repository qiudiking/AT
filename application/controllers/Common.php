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
}