<?php


/**
 * @param $class
 *
 * @return bool
 */
function autoLoad($class)
{
	$class = str_replace('\\','/',$class);
	$file =  AT .'/'.$class .'.php';
	if(is_file($file)){
		include_once $file;
		return true;
	}
	$file = MANAGE_PATH .'/'.$class .'.php';
	if(is_file($file)){
	    include_once $file;
	    return true;
	}
	return false ;
}

spl_autoload_register('autoLoad');
