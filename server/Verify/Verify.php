<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/1/14 0014
 * Time: 11:02
 */

namespace server\Verify;


interface Verify {
	/**
	 * @param \server\Verify\VerifyRule $verifyRule
	 *
	 * @return mixed
	 */
	public function doVerifyRule( VerifyRule $verifyRule);
}