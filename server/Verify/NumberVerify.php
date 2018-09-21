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
 * 纯数字校验类
 * Class NumberVerify
 *
 * @package Verify
 */
class NumberVerify implements Verify {
	/**
	 * @param \server\Verify\VerifyRule $verifyRule
	 *
	 * @return bool|mixed
	 * @throws \server\Exception\VerifyException
	 */
	public function doVerifyRule( VerifyRule $verifyRule ) {
		$verifyRule->chkDataType();
		if (  preg_match( "/^\d+$/", $verifyRule->value) == 0) {
			$verifyRule->error || $verifyRule->error= $verifyRule->getDes(). '不是有效的数字' ;
			throw new VerifyException( ErrorHandler::VERIFY_NUMBER, $verifyRule->error );
		}

		return true;
	}

}