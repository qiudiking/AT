<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/1/14 0014
 * Time: 12:16
 */

namespace server\Verify;

use server\Exception\ErrorHandler;
use server\Exception\VerifyException;


/**
 * 指定长度校验类
 * Class LengthVerify
 *
 * @package Verify
 */
class LengthVerify implements Verify {
	/**
	 * @param \server\Verify\VerifyRule $verifyRule
	 *
	 * @return bool|mixed
	 * @throws \server\Exception\VerifyException
	 */
	public function doVerifyRule( VerifyRule $verifyRule ) {
		$verifyRule->chkDataType();
		if ( intval( $verifyRule->ruleValue) != mb_strlen( $verifyRule->value ) ) {
			$verifyRule->error || $verifyRule->error= $verifyRule->getDes(). '长度必须等于' . $verifyRule->ruleValue.'个字符';
			throw new VerifyException( ErrorHandler::VERIFY_LENGTH, $verifyRule->error );
		}

		return true;
	}

}