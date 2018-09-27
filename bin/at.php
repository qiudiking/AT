<?php
define("AT",__DIR__.'/..');
define('APPLICATION_PATH', dirname(__FILE__).'/..');
define('DEBUG',true);
include AT .'/server/AutoLoad.php';
include AT .'/vendor/autoload.php';
include AT.'/server/common/function.php';
define('MANAGE_PATH',$data = \Noodlehaus\Config::load(getConfigPath())['common']['application.library']);
\server\Start::run();