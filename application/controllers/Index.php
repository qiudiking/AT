<?php
use server\YafController\YafController;
/**
 * @name IndexController
 * @author desktop-m38aanj\htpc
 * @desc 默认控制器
 * @see http://www.php.net/manual/en/class.yaf-controller-abstract.php
 */
class IndexController extends YafController
{

	public function indexAction()
	{
		$this->display('index');
	}

	public function demoAction()
	{
		$this->getView()->display('index/demo.phtml');
	}

	public function demo2Action(){
		echo '成功跳转';
	}
}
