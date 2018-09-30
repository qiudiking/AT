<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/2/23
 * Time: 22:48
 */

namespace server\DB;




abstract class EntityFactoryBase {

	private static $instanceList = [];

	/**
	 * @param      $class
	 * @param null $id
	 * @param bool $is_instance
	 *
	 * @return mixed
	 * @throws \server\Exception\SystemException
	 */
	public static function instance( $class, $id = null, $is_instance = false ) {
		if ( ! class_exists( $class ) ) {
			\server\Exception\ThrowException::SystemException( \server\Exception\ErrorHandler::CLASS_EXIST, $class . '类不存在' );
		}
		if ( $is_instance === true ) {
			$instance = new $class( $id );
		} else {
			$instance = getArrVal( $class, self::$instanceList );
		}
		if ( ! $instance ) {
			$instance                     = new $class( $id );
			//self::$instanceList[ $class ] = $instance;
		}else{
			self::initEntity( $class, $instance );
		}
		if ( method_exists( $instance, 'init' ) ) {
			$instance->init();
		}

		return $instance;
	}

	/**
	 * 删除对象实例
	 */
	public static function clear(){
		foreach ( self::$instanceList as $obj ) {
			unset( $obj );
	    }

	}

	public static function initEntity($className,$obj){
		/**
		 * 默认值
		 */
		$proper=get_class_vars($className);
		foreach ( $proper as $key => $value ) {
			if($key{0}!='_'){
				$obj->$key=$value;
			}
		}
	}
}