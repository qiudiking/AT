<?php
/**
 * @name IndexController
 * @author desktop-m38aanj\htpc
 * @desc 默认控制器
 * @see http://www.php.net/manual/en/class.yaf-controller-abstract.php
 */
class IndexController extends CommonController
{
	/**
	 * @throws \server\Exception\SystemException
	 */
	public function indexAction()
	{



	}

	public function demoAction()
	{
		$this->getView()->display('index/demo.phtml');
	}

	public function demo2Action(){

	}
}
