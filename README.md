# AT介绍
AT微型php框架,主要基于swoole和yaf开发的一个轻量级框架,简单易用

# 安装环境
- Linux
- php>=7
- php扩展: swoole>=4.0.4 yaf>=3.0.6 yac>=2.0.2 seaslog>=1.7.6


# 服务
- 服务HTTP

php bin/at.php start HTTP 启动服务

php bin/at.php restart HTTP 重启服务

php bin/at.php stop HTTP 停止服务

- TCP服务

php bin/at.php start TCP 启动服务

php bin/at.php restart TCP 重启服务

php bin/at.php stop TCP 停止服务


# 路由
路由使用
- 默认路由 Index/Index/Index

自定义路由
- 到conf/route.php 使用正则路由

# 注释字段校验
- 在动作上一行注释可以做校验

controller Action 注释作用

/**
 * test  //方法说名
 * @sign  //是否开启签名
 * @method GET  //请求方式
 * @verify {"field":"title","description":"标题","rules":[{"rule":"required"}]} //字段校验
 * @verify {"field":"redirect_url","rules":[{"rule":"required"},{"rule":"url"}],"description":"回跳地址"} //字段校验
 */	
- 数据校验

单字段,单校验规则 @verify {"field":"code","description":"短信验证码","rule":"required"}

单字段,多校验规则 @verify {"field":"code","description":"短信验证码","rules":[{"rule":"required"},{"rule":"url"}]}

多字段,单校验规则 @verify {"fields":[{"filed":"nmae"},{"filed":"moble"}],"description":"短信验证码","rule":"required"}

多字段,多校验规则 @verify {"fields":[{"filed":"nmae"},{"filed":"moble"}],"description":"短信验证码",rules":[{"rule":"required"},{"rule":"url"}]}

# API签名
- api使用签名校验合法性

到conf/application.ini[sign] 开启需要API签名的控制器

也可以在Action的注释中设置某个Action需要API签名 例如: @sign true签名 false不签名

# 场景选择
- AT框架分为两种场景应用 API 页面显示 都是继承YafController


# MySql操作

- 获取MySQL实体表

在bin 运行 php at.php mysql <实体/工厂>  <数据库名>

**注意:先运行实体再运行工厂**

- 模型

增
$entity = \Factory\TestEntityFactory::SmEntity();

$entity->username = 'qiufeng1';

$res = $entity->save();

删 

$entity = \Factory\TestEntityFactory::SmEntity(1);

$res = $entity->delete();

改

$entity = \Factory\TestEntityFactory::SmEntity(1);

$entity->username = 'qiufeng1';

$res = $entity->update();

查

$entity = \Factory\TestEntityFactory::SmEntity(1);
$entity->unsetContainer();

- 数据操作



# 网络通讯
- 链接TCP服务的同步/异步请求
- 链接TCP服务的协程  

使用协程返回后可能全局变量和static变量会改变

