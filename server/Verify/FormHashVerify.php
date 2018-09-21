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
 * 表单Hash校验
 * Class FormHashVerify
 *
 * @package Verify
 */
class FormHashVerify implements Verify {
	/**
	 * @param \server\Verify\VerifyRule $verifyRule
	 *
	 * @return bool|mixed
	 * @throws \server\Exception\VerifyException
	 */
	public function doVerifyRule( VerifyRule $verifyRule ) {
		$verifyRule->chkDataType();
		if(!FormHash::verifyHash($verifyRule->value,true)){
			$verifyRule->error || $verifyRule->error= $verifyRule->getDes(). '请求无效' ;
			throw new VerifyException( ErrorHandler::VERIFY_FORM_HASH, $verifyRule->error );
		}
		return true;
	}

}