<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/7/28 0028
 * Time: 9:25
 */

namespace server\Exception;


/**
 * 操作成功
 * 通过异常方式停止向下运行
 * Class DBException
 *
 * @package Exception
 */
class ActionSuccessException extends \Exception
{
    const code = 0;
    /**
     * 跳转url
     * @var string
     */
    protected $url = '';
    /**
     * 跳转时间
     * @var int
     */
    protected $time = 0;
    public function __construct( $message=null ) {

        parent::__construct( $message , self::code );

    }

    /**
     * @return string
     */
    public function getUrl()
    {
        return $this->url;
    }

    /**
     * @param string $url
     */
    public function setUrl( $url )
    {
        $this->url = $url;
    }

    /**
     * @return int
     */
    public function getTime()
    {
        return $this->time;
    }

    /**
     * @param int $time
     */
    public function setTime( $time )
    {
        $this->time = $time;
    }

	/**
	 * @param      $message
	 * @param null $url
	 * @param int  $time
	 *
	 * @throws \server\Exception\ActionSuccessException
	 */
    static function success( $message , $url=null , $time=0 )
    {
        $instance = new self( $message );
        $instance->setTime( $time );
        $instance->setUrl( $url );
        throw $instance;
    }
}