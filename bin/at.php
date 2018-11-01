<?php
define("AT",__DIR__.'/..');
define('APPLICATION_PATH', dirname(__FILE__).'/..');
define('DEBUG',true);//是否开启调试
define('DFS',false);//是否使用分布式
include AT .'/server/AutoLoad.php';
include AT .'/vendor/autoload.php';
include AT.'/server/common/function.php';
define('MANAGE_PATH',$data = \Noodlehaus\Config::load(getConfigPath())['common']['application.library']);
\server\Start::run();