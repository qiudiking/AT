<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/1/14 0014
 * Time: 15:38
 */

namespace server\Verify;


/**
 * 校验类工厂
 * Class VerifyFactory
 *
 * @package Verify
 */
class VerifyFactory {
	public static $instanceList ;

	/**
	 * @return \server\Verify\MinVerify
	 */
	public static function MinVerify() {
		return self::instance( MinVerify::class);
	}

	/**
	 * @return MaxVerify
	 */
	public static function MaxVerify() {

		return self::instance( MaxVerify::class );
	}

	/**
	 * @return mixed
	 */
	public static function MinLengthVerify() {
		return self::instance( MinLengthVerify::class);
	}
	/**
	 * @return MaxLengthVerify
	 */
	public static function MaxLengthVerify() {
		return self::instance( MaxLengthVerify::class);
	}

	/**
	 * @return RequiredVerify
	 */
	public static function RequiredVerify() {
		return self::instance( RequiredVerify::class);
	}

	/**
	 * @return NumberVerify
	 */
	public static function NumberVerify() {
		return self::instance( NumberVerify::class);
	}

	/**
	 * @return MobileVerify
	 */
	public static function MobileVerify() {
		return self::instance( MobileVerify::class);
	}

	/**
	 * @return PatternVerify
	 */
	public static function PatternVerify() {
		return self::instance( PatternVerify::class);
	}

	/**
	 * @return EmailVerify
	 */
	public static function EmailVerify() {
		return self::instance( EmailVerify::class);
	}

	/**
	 * @return BetweenVerify
	 */
	public static function BetweenVerify() {
		return self::instance( BetweenVerify::class);
	}

	/**
	 * @return BetweenLengthVerify
	 */
	public static function BetweenLengthVerify(){
		return self::instance( BetweenLengthVerify::class );
	}

	/**
	 * @return InVerify
	 */
	public static function InVerify(){
		return self::instance( InVerify::class );
	}

	/**
	 * @return NumericVerify
	 */
	public static function NumericVerify(){
		return self::instance( NumericVerify::class );
	}

	/**
	 * @return UrlVerify
	 */
	public static function UrlVerify(){
		return self::instance( UrlVerify::class );
	}

	/**
	 * @return PhoneVerify
	 */
	public static function PhoneVerify(){
		return self::instance( PhoneVerify::class );
	}

	/**
	 * @return TimestampVerify
	 */
	public static function TimestampVerify(){
		return self::instance( TimestampVerify::class );
	}

	/**
	 * @return \server\Verify\SignVerify
	 */
	public static function SignVerify(){
		return self::instance( SignVerify::class );
	}

	/**
	 * @return \server\Verify\Base64ImageVerify
	 */
	public static function Base64ImageVerify(){
		return self::instance( Base64ImageVerify::class );
	}

	/**
	 * @return \server\Verify\LengthVerify
	 */
	public static function LengthVerify(){
		return self::instance(LengthVerify::class);
	}

	/**
	 * @return \server\Verify\FormHashVerify
	 */
	public static function FormHashVerify(){
		return self::instance(FormHashVerify::class);
	}

	/**
	 * @return \server\Verify\MobileNewsVerify
	 */
	public static function MobileNewsVerify(){
		return self::instance(MobileNewsVerify::class);
	}

	/**
	 * @return \server\Verify\MobileCodeVerify
	 */
	public static function MobileCodeVerify(){
		return self::instance(MobileCodeVerify::class);
	}

	/**
	 * 获取单例
	 * @param $class
	 *
	 * @return mixed
	 */
	protected static function instance( $class ) {
		if(isset(self::$instanceList[$class]) && self::$instanceList[$class]){
			$instance=self::$instanceList[$class];
		}else{
			$instance= new $class();
			self::$instanceList[ $class ] = $instance;
		}
		return $instance;
	}

	/**
	 * @return VerifyRule
	 */
	public static function VerifyRule(){
		$instance = self::instance( VerifyRule::class );
		$instance -> init();

		return $instance;
	}

}