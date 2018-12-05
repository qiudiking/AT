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


object $entity = \Factory\TestEntityFactory::SmEntity( $id );

. $id 数据表中的主键,    主键存在时返回该主键数据  默认为null  为null返回空模型



增  可以使用数据映射方式也可以使用数组方式 同时使用 数组方式优先
    
声明   有主键的情况下为修改 会全部修改 (不推使用)
    
$entity->username='hello';(数据映射)

 int/string  $entity->save( array $data(数组) );

string 添加成功返回数据的主键
   int 修改成功返回 影响行数
   int 修改失败返回 0


删  已主键为限制条件
 int $res = $entity->delete();

   int 删除成功返回 影响行数
   int 删除失败返回 0
 
改 已主键为限制条件

声明 会全部修改 (不推使用)

$entity->username = 'qiufeng1';
int $entity->update();

 int 修改成功返回 影响行数
 int 修改失败返回 0


 将数据设置到实体中

 Booleans $entity->setData( array $data )
 
 $data 设置数据


   根据主键查询一条数据并设置到实体中

  Booleans $entity->get( $id );
  
  $id 表的主键
  
  
  将表实体的数据转数组(过滤 将null的值过滤)
  
  array  $entity->getDataToArr();
  
  将表实体的数据转数组(不过滤)
  
  $entity->getProperty();
  
 
  字段自增  
  
  int $entity->setInc( String $field int $step = 1 )
  
  $field 字段名,$step 自增的数 默认1 返回行数
  
  
   字段自减
    
   int $entity->setRnc( String $field , int $step = 1)
    
   $field  需要自减的字段  $step 自减数 默认1 返回行数
  
  
  
  获取表操作对象
  
  object $entity->getContainer()

  删除表操作对象

  
  void $entity->unsetContainer()
  
  获取数据库名
 
  String $entity->_dbName
    
  String $entity->getDBName()
  
  
  获取表名
  
  String $entity->_tableName
  
  $entity->getTableName()
   
  
  获取表的全部数据
  
  array $entity->getAll()
  
  
  
  一个限制条件查询一条数据
  
  array/Booleans $entity->getInfoBy( $field ,$filed_value);
  
  
  是否验证字段
  
  Booleans $entity->isIsVerify()
  
  
  设置是否验证字段
  
  void $entity->setIsVerify( Booleans $is_verify);
  
  
  设置数据库名
     
  void $entity->setDbName( $dbName );
  
  
  设置数据表名
  
  
  void $entity->setTableName( $tableName );
  
  
  
  
  
  #Mysql操作
   object $container = $entity->getContainer();
  
  获取model对象
  
  object $container->getModel();
   
   
  字段自增
  
  $container->setInc( String $field , int $step ); 
   
  $field 字段名,$step 自增的数 默认1 返回行数



  字段自减
  
  $container->setRnc( String $field , int $step ); 
   
  $field 字段名,$step 自增的数 默认1 返回行数
  
  
  
  获取多行数据 
  
  array/ $container->getAll($where = []);
  
  $where 限制条件  默认为不限制 获取全部
  
  
  
  保存数据 与$entity->save()一样
  
   $entity->username = 'name';
   $container->save();
  
  
  删除数据 与$entity->delete()一样

  $container->delete();
  
  
  
  修改数据 和$entity->update() 一样
  
  $entity->username = 'qiufeng1';
  int $entity->$container->update();
  
   int 修改成功返回 影响行数
   int 修改失败返回 0
   
  
  
  注册观察者
  
  $container->attach(SplObserver $observer )
   
  
  通知观察者 (操作成功后自动通知)
  
  $container->notify() 
   
   
  注销观察者
  
  $container->detach(SplObserver $observer)
  
  
  清除观察者 (通知观察者后会自动清除)
  
  $container->clearObserver();
  
  
  获取该表主键的字段名
  
  $container->getPK()
  
  
  获取该主键的值
  
  $container->getPKV();
  
  
  
  

# MODEL操作

增
$model = \Factory\TestEntityFactory::SmEntity()->getContainer()->getModel();

int/Booleans $model->add(array $data);

ps 返回0 主键为字符串或者没有主键

int/Booleans $model->where(array $where)->update( array $data ); 

ps 返回0 影响0行 

int/Booleans $model->where( array $where)->setAutoInc(string/array $data);


- 数据操作



# 网络通讯
- 链接TCP服务的同步/异步请求
- 链接TCP服务的协程  

使用协程返回后可能全局变量和static变量会改变

