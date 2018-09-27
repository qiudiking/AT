<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/6/18
 * Time: 22:52
 */

namespace server\Client;




abstract class ClientServerBase {
	/**
	 * @var \Result\Result
	 */
	public $result;
	public function __construct() {
	}
	public function init(){
		$this->result=Result::Instance();
	}
}