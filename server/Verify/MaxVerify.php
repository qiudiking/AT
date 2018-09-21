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
 * 最大值校验类
 * Class MaxVerify
 *
 * @package Verify
 */
class MaxVerify implements Verify {
	/**
	 * @param \server\Verify\VerifyRule $verifyRule
	 *
	 * @return mixed|void
	 * @throws \server\Exception\VerifyException
	 */
	public function doVerifyRule( VerifyRule $verifyRule ) {
		$verifyRule->chkDataType();
		if ( floatval( $verifyRule->ruleValue ) < floatval( $verifyRule->value ) ) {
			$verifyRule->error || $verifyRule->error= $verifyRule->getDes(). '不能大于' . $verifyRule->value;
			throw new VerifyException( ErrorHandler::VERIFY_MAX, $verifyRule->error );
		}
	}

}