<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/7/28 0028
 * Time: 10:37
 */

namespace server\Exception;
use Log\Log;

/**
 * 快速抛出异常
 * Class ThrowException
 *
 * @package Exception
 */
class ThrowException
{
	/**
	 * @param        $code
	 * @param string $msg
	 *
	 * @throws \server\Exception\DBException
	 */
    public static function DBException( $code , $msg ='')
    {
        throw new DBException( $code , $msg );
    }

	/**
	 * 抛出订单异常
	 * @param        $code
	 * @param string $msg
	 *
	 * @throws \server\Exception\OrderException
	 */
    public static function OrderException($code,$msg='')
    {
      //  Log::error( '订单异常:msg=' . $msg . ' ; code=' . $code );
        throw new OrderException(  $msg ,$code);
    }

	/**
	 * 抛出签名异常
	 * @param        $code
	 * @param string $msg
	 *
	 * @throws \server\Exception\SignException
	 */
	public static function SignException( $code, $msg = '' ) {
		$msg || $msg = ErrorHandler::getErrMsg( $code );
		throw new SignException( $code, $msg );
	}

	/**
	 * 信息异常
	 * @param        $code
	 * @param string $msg
	 *
	 * @throws \server\Exception\MessageException
	 */
    public static function MessageException( $code, $msg = '' ) {
            $msg || $msg = ErrorHandler::getErrMsg( $code );
            throw new MessageException( $code, $msg );
        }

	/**
	 * 抛出服务提供异常
	 * @param        $code
	 * @param string $msg
	 *
	 * @throws \server\Exception\ProvideException
	 */
    public static function ProvideException($code,$msg='')
    {
        throw new ProvideException( $code , $msg );
    }

	/**
	 *  抛出系统异常
	 * @param        $code
	 * @param string $msg
	 *
	 * @throws \server\Exception\SystemException
	 */
    public static function SystemException( $code , $msg = '' )
    {
        $msg || $msg = ErrorHandler::getErrMsg( $code );
        //Log::error( '系统异常:msg=' . $msg . ' ; code=' . $code );
        throw new SystemException( $code , $msg );
    }

	/**
	 * @param        $code
	 * @param string $msg
	 *
	 * @throws \server\Exception\MongodbException
	 */
    public static function MongodbException( $code , $msg ='')
    {
        $msg || $msg = ErrorHandler::getErrMsg( $code );
        //Log::error( 'mongodb异常:msg=' . $msg . ' ; code=' . $code );
        throw new MongodbException( $code , $msg );
    }

	/**
	 * 严重错误并通知
	 * @param        $code
	 * @param string $msg
	 *
	 * @throws \server\Exception\GrossErrorException
	 */
	public static function GrossErrorException($code,$msg=''){
		throw new GrossErrorException( $code , $msg );
	}
}