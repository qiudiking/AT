<?php
use AtServer\YafController;
/**
 * @name IndexController
 * @author desktop-m38aanj\htpc
 * @desc 默认控制器
 * @see http://www.php.net/manual/en/class.yaf-controller-abstract.php
 */
class IndexController extends YafController
{
	/**
	 * @method GET
	 */
	public function IndexAction()
	{
		setCookieInfo('session_id',getRandChar(16));
		$this->display('index');
	}

	public function demoAction()
	{
		$this->display('demo');
	}

	public function demo2Action()
	{
		echo '成功跳转';
	}

	public function ceAction()
	{

	}

	public function yaoyiyaoAction()
	{
		$this->display('yaoyiyao');
	}
}
