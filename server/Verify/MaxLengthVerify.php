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
 * 最大长度校验类
 * Class MaxLengthVerify
 *
 * @package Verify
 */
class MaxLengthVerify implements Verify {
	/**
	 * @param \Verify\VerifyRule $verifyRule
	 * @return bool
	 * @throws \Exception\VerifyException
	 */
	public function doVerifyRule( VerifyRule $verifyRule ) {
		$verifyRule->chkDataType();

		if ( intval( $verifyRule->ruleValue) < mb_strlen( $verifyRule->value ) ) {
			$verifyRule->error || $verifyRule->error= $verifyRule->getDes(). '长度不能大于' . $verifyRule->ruleValue. '个字符';
			throw new VerifyException( ErrorHandler::VERIFY_MAX_LENGTH, $verifyRule->error );
		}

		return true;
	}

}