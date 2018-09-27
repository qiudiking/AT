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
	 * @throws \server\Exception\ClientException
	 */
	public function indexAction()
	{
		$result = \server\Client\Result::Instance();
		$result->setCode( $this->invokeCoroutine('\App\Demo::hello'));
		echo $result;
	}

	public function demoAction()
	{
		$this->display('demo');
	}
}
