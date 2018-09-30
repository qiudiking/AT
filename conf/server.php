<?php
/**
 * Created by PhpStorm.
 * User: zhangjincheng
 * Date: 16-7-14
 * Time: 下午1:58
 *
 */


/**
 * 服务器设置
 */
 return [
 	'server'=> [
	    'TCP'=>[
		    'open_length_check'=>1,
		    'package_length_type'=>'N',
		    'package_max_length'=>4194304,
		    'package_body_offset'=>4,
		    'package_length_offset'=>0,
		    'max_request'=>300000,
		    'worker_num'=>8,
		    'task_worker_num'=>2,
		    'log_file'=> '/var/log/swoole.log',
		    'user'=>'root',
		    'group'=>'root',
		    'process_name'=>'AT_TCP',
		    'daemonize'=>1,
	    ],
	    'HTTP'=>[
			'worker_num'=>4,
		    'task_worker_num'=>4,
		    'max_request'=>30000,
		    'daemonize'=>1,
		    'log_file'=>'/var/log/swoole.log',
		    'user'=>'root',
		    'group'=>'root',
		    'package_max_length'=>4194304,
		    'process_name'=>'AT_HTTP',
			'document_root' => AT.'/public',
			'enable_static_handler' => true,
	    ]
    ]
 ];
