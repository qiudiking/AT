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
 * URL校验
 * Class UrlVerify
 *
 * @package Verify
 */
class UrlVerify implements Verify {
	/**
	 * @param \server\Verify\VerifyRule $verifyRule
	 *
	 * @return bool|mixed
	 * @throws \server\Exception\VerifyException
	 */
	public function doVerifyRule( VerifyRule $verifyRule ) {
		$verifyRule->chkDataType();
		if (preg_match('/^(http|https|ftp)\:\/\/\S+$/', urldecode($verifyRule->value)) == 0) {
			$verifyRule->error || $verifyRule->error = $verifyRule->getDes() . '必须是URL';
			throw new VerifyException(ErrorHandler::VERIFY_EMAIL_INVALID, $verifyRule->error);
		}

		return true;
	}

}