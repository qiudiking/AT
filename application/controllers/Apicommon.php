<?php
/**
 * Created by PhpStorm.
 * User: htpc
 * Date: 2018/8/24
 * Time: 17:26
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
}