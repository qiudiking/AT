<?php
/**
 * Created by PhpStorm.
 * User: user
 * Date: 2018/12/4
 * Time: 16:40
 */

namespace Library\Ws\Index;


use AtServer\Log;

class Message extends Index
{
	public function Index(\swoole_websocket_server $server, \Swoole\WebSocket\Frame $frame)
	{
		$this->setResult($server->connection_list(),self::SEND_MESSAGE_PUBLIC)->setData(['hello'=>'你好']);
		return $this->result;
	}

}