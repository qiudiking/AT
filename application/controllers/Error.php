<?php
/**
 * @name ErrorController
 * @desc 错误控制器, 在发生未捕获的异常时刻被调用
 * @see http://www.php.net/manual/en/yaf-dispatcher.catchexception.php
 * @author desktop-m38aanj\htpc
 */
class ErrorController extends Yaf\Controller_Abstract {

	//从2.1开始, errorAction支持直接通过参数获取异常
	public function errorAction($exception) {
		$this->getView()->assign("exception", $exception);
		$this->display('error/error');
	}
}