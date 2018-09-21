<?php
define("AT",__DIR__.'/..');
define('APPLICATION_PATH', dirname(__FILE__).'/..');
define('MANAGE_PATH',AT.'/application/Library');
define('DEBUG',true);
include AT .'/server/AutoLoad.php';
include AT .'/vendor/autoload.php';
include AT.'/server/common/function.php';
\server\Start::run();