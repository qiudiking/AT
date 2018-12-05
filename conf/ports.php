<?php
/**
 * Created by PhpStorm.
 * User: zhangjincheng
 * Date: 16-7-14
 * Time: 下午1:58
 */
use AtServer\CoreBase\PortManager;


$config['ports']['TCP'] = [
    'socket_type' => PortManager::SOCK_TCP,
    'socket_host' => '0.0.0.0',
    'socket_port' => 9091,
    'pack_tool' => 'LenJsonPack',
    'route_tool' => 'NormalRoute',
    'middlewares' => ['MonitorMiddleware']
];

$config['ports']['HTTP'] = [
    'socket_type' => PortManager::SOCK_HTTP,
    'socket_host' => '0.0.0.0',
    'socket_port' => 9092,
    'route_tool' => 'NormalRoute',
    'middlewares' => ['MonitorMiddleware', 'NormalHttpMiddleware'],
    'method_prefix' => 'http_'
];

$config['ports']['WS'] = [
    'socket_type' => PortManager::SOCK_WS,
    'socket_host' => '0.0.0.0',
    'socket_port' => 9093,
    'route_tool' => 'NormalRoute',
    'pack_tool' => 'NonJsonPack',
    'opcode' => PortManager::WEBSOCKET_OPCODE_TEXT,
    'middlewares' => ['MonitorMiddleware', 'NormalHttpMiddleware']
];

return $config;