<?php
/**
 * Created by PhpStorm.
 * User: user
 * Date: 2018/11/26
 * Time: 14:25
 */

namespace Library\Ws\Index;



use AtServer\Log;
use AtServer\WsMessageBase;

class Index extends WsMessageBase
{
	public  function handshake( \swoole_http_request $request, \swoole_http_response $response )
	{
		Log::log('websocket开始握手');
	}

	public   function open(\swoole_websocket_server $server, \Swoole\Http\Request $request)
	{
		Log::log('websocket连接成功');
	}

	public  function message(\swoole_websocket_server $server, \Swoole\WebSocket\Frame $frame)
	{

		Log::log('websocket发送消息');
		return true;
	}

	public  function close( $server, $fd, $reactorId )
	{
		Log::log('websocket连接关闭');
	}
}