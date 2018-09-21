<?php
/**
 * Created by PhpStorm.
 * User: admin
 * Date: 16/8/4
 * Time: 下午11:39
 */

namespace server\Exception;

/**
 * Class SOAClientException
 *
 * @package Exception
 */
class SOAClientException extends \Exception{
	public function __construct( $message, $code  ) {
		parent::__construct( $message, $code );
	}

}