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
		$data = $this->invokeCoroutine('\App\Demo::hello');
		$data = $this->invokeCoroutine('\App\Demo::hello');
		\server\Log\Log::log(\Swoole\Coroutine::getuid());
		echo json_encode(seaslog_get_version());
		//$this->display('index');
	}

	public function demoAction()
	{
		$this->invokeAsyncResponse('\App\Demo::hello');
		//$this->display('demo');
	}

	public function demo2Action(){
		echo '成功跳转';
	}
}
