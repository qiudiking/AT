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
		include $file;
	}else{
		return false ;
	}
}

spl_autoload_register('autoLoad');
