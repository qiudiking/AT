<?php
/**
 * @name IndexController
 * @author desktop-m38aanj\htpc
 * @desc 默认控制器
 * @see http://www.php.net/manual/en/class.yaf-controller-abstract.php
 */
class IndexController extends CommonController
{
	public function indexAction()
	{
		$this->display('index');
	}
}
