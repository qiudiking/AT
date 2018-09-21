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
 * 必填校验
 * Class RequiredVerify
 *
 * @package Verify
 */
class RequiredVerify implements Verify {
	/**
	 * @param \server\Verify\VerifyRule $verifyRule
	 *
	 * @return bool|mixed
	 * @throws \server\Exception\VerifyException
	 */
	public function doVerifyRule( VerifyRule $verifyRule ) {
		$verifyRule->chkDataType();
		if ( strlen($verifyRule->value)==0) {
			$verifyRule->error || $verifyRule->error= $verifyRule->getDes(). '不能为空' ;
			throw new VerifyException( ErrorHandler::VERIFY_REQUIRED, $verifyRule->error );
		}

		return true;
	}

}