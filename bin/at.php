<?php
define("AT",__DIR__.'/..');
define('APPLICATION_PATH', dirname(__FILE__).'/..');
define('DEBUG',true);//是否开启调试
define('DFS',true);//是否使用分布式
define('CONSOLE_PATH',AT.'/vendor/at_server/console');
define('SWOOLE_TABLE',['AtServer\Swoole\ConnceInfo']);//使用swoole 内存表
include AT .'/vendor/autoload.php';
define('MANAGE_PATH', \Noodlehaus\Config::load(getConfigPath())['common']['application.library']);
AtServer\Start::run();
