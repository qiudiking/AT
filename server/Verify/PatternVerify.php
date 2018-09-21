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
 * 正则校验
 * Class PatternVerify
 *
 * @package Verify
 */
class PatternVerify implements Verify {
	/**
	 * @param \server\Verify\VerifyRule $verifyRule
	 *
	 * @return mixed|void
	 * @throws \server\Exception\VerifyException
	 */
	public function doVerifyRule( VerifyRule $verifyRule ) {
		$verifyRule->chkDataType();
		if ( $verifyRule->ruleValue && ! preg_match( $verifyRule->ruleValue, $verifyRule->value) ) {
			$verifyRule->error || $verifyRule->error = $verifyRule->getDes() . '匹配不通过';
			throw new VerifyException( ErrorHandler::VERIFY_PATTERN, $verifyRule->error );
		}
	}

}