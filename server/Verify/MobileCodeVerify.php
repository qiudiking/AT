<?php
/**
 * Created by PhpStorm.
 * User: htpc
 * Date: 2018/3/20
 * Time: 10:50
 */

namespace server\Verify;


use Log\Log;
use News\FormNews;
use server\Exception\ErrorHandler;
use server\Exception\VerifyException;
use Request\Request;
use Sign\Sign;
use Tool\Tool;

/**
 * 手机短信验证
 * Class MobileNewsVerify
 *
 * @package Verify
 */
class MobileCodeVerify implements Verify {
	/**
	 * @param \server\Verify\VerifyRule $verifyRule
	 *
	 * @return bool|mixed
	 * @throws \server\Exception\VerifyException
	 */
	public function doVerifyRule( VerifyRule $verifyRule ) {
		$verifyRule->chkDataType();
		$mobile = Request::get('mobile');
		$data['mobile'] = $mobile;
		$data['code'] = $verifyRule->value;

		$tool_server_url = Tool::getArrVal('tool_server_url',\Config\Config::getApiConfig() );
		$url = $tool_server_url.'/checkCode';
		Sign::MakeSign($url,$data);
		$info = \Tool\Tool::httpPost($url,$data);
		$postData = \Tool\JSON::decode($info,false);
		//Log::log($postData);
		/*Log::log($mobile);
		Log::log($verifyRule->value);
		Log::log('---------------------'.$verifyRule);*/
		if($postData->code !=0){
			$verifyRule->error || $verifyRule->error= $postData->msg;
			throw new VerifyException( ErrorHandler::VERIFY_FORM_HASH, $verifyRule->error );
		}
		return true;
	}
}