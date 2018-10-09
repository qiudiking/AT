window.webapp = {};
/**
 * 获取url 参数
 * @param name
 * @param url
 * @returns {*}
 */
webapp.getUrlParam = function ( name , url ) {
    url         = url || location.href;
    this.urlArr = url.split( '?' );
    if ( this.urlArr.length < 2 ) {
        return '';
    }
    this.paramsArr = this.urlArr[ 1 ].split( '&' );
    var params     = [];
    for ( var i in this.paramsArr ) {
        this._tmpArr                = this.paramsArr[ i ].split( '=' );
        params[ this._tmpArr[ 0 ] ] = this._tmpArr[ 1 ] ? this._tmpArr[ 1 ] : '';
        if ( this._tmpArr[ 0 ] && this._tmpArr[ 0 ] == name ) {
            return this._tmpArr[ 1 ];
        }
    }
    return params;
};

webapp.isMobile = function ( mobile ) {
    return /^1\d{10}$/i.test( mobile );
};

webapp.isEmail = function ( email ) {
    return /^[\w\-\.]+@[\w\-\.]+(\.\w+)+$/i.test( email );
};

webapp.isIdcard = function ( idcard ) {
    return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test( idcard );
};

/**
 * 获取会话id
 */
webapp.getSessionId = function () {
    return this.getCookie( this.session_id_key );
};
/**
 * 保存sessionId 到cookie中
 * @param sessionId
 */
webapp.setSessionId = function ( sessionId ) {
    webapp.setCookie( this.session_id_key , sessionId || '' );
};

/**
 * 数组转 url参数
 * @param arr
 * @returns {*}
 * @constructor
 */
webapp.ArrToUrlParam = function ( arr ) {
    if ( typeof arr === 'object' ) {
        var param = '';
        for ( var i in arr ) {
            if ( param !== '' ) param += '&';
            param += i + '=' + arr[ i ];
        }
        return param;
    }
    return false;
};

/**
 *
 * @param text
 * @param  time 秒
 * @param url 可以是回调函数
 */
webapp.success = function ( text , time , url ) {
    time = time || 1000;
    this.toast( text , time );
    setTimeout( function () {
        if(webapp.isFunction(url)){
            url();
        }else if ( url ) {
            location.href = url;
        }
    } , time );
};

webapp.dialogOk             = function () {

};
webapp.dialogCancelCallback = function () {

};

webapp.dialog = function ( content , opt ) {
    var ContentDialog = $( '#ContentDialog' ).show();
    $( '#DialogContent' , ContentDialog ).html( content );
    opt = opt || {};
    if ( opt.ok_text ) {
        $( '#ok' , ContentDialog ).text( opt.ok_text );
    }
    if ( this.isFunction( opt.okCallback ) ) {
        this.dialogOk = opt.okCallback;
    }
    if ( this.isFunction( opt.cancelCallback ) ) {
        this.dialogCancelCallback = opt.cancelCallback;
    }
    if ( opt.cancel_text ) {
        $( '#cancel' , ContentDialog ).text( opt.cancel_text );
    }
};

webapp.closeDialog = function () {
    this.dialogCancelCallback();
    $( '#ContentDialog' ).hide();
};

webapp.alert = function ( text ,callback,closeBtnText) {
    closeBtnText=closeBtnText||'知道了';
    $('#iosDialogAlert_ok_btn').html(closeBtnText);
    $( '#iosDialogAlert' ).show().find( '#alertContent' ).html( text );
    if(webapp.isFunction(callback)){
        $('#iosDialogAlert_ok_btn').click(function () {
            callback();
            $(this).unbind('click')
        });
       
    }
    
};

webapp.iosDialogConfirmCallBack = "";
webapp.iosDialogConfirm         = function ( flag ) {
    if ( flag ) {
        if ( this.isFunction( this.iosDialogConfirmCallBack ) ) this.iosDialogConfirmCallBack();
    }
    this.iosDialogConfirmCallBack = '';
    $( '#iosDialogConfirm' ).hide();
};
/**
 * 确认提示
 * @param text
 * @param callback
 */
webapp.confirm = function ( text , callback ) {
    $( "#iosDialogConfirm" ).show().find( "#iosDialogConfirmContent" ).text( text || '' );
    this.iosDialogConfirmCallBack = callback;
};

/**
 * 错误提示
 * @param time
 * @param title
 */
webapp.error = function ( title , time ) {
    $( '#toastError' ).show().find( '.weui-toast__content' ).text( title || '错误' );
    time = time || 2000;
    setTimeout( function () {
        $( '#toastError' ).hide();
    } , time )
    
};
webapp.is_show_loading = true;
/**
 * 加载中
 */
webapp.loading = function ( title ) {
    if ( this.is_show_loading ) {
        $( '#loadingToast' ).show().find( '.weui-toast__content' ).text( title || '数据加载中' );
    }
};

webapp.toast        = function ( title , time ) {
    $( '#toast' ).show().find( '.weui-toast__content' ).text( title || '已完成' );
    time = time || 2000;
    setTimeout( function () {
        $( '#toast' ).hide();
    } , time )
};
webapp.closeLoading = function () {
    $( '#loadingToast' ).hide();
};

/**
 * 检测类型是函数返回 true
 * @param funcName
 * @returns {boolean}
 */
webapp.isFunction = function ( funcName ) {
    return typeof funcName === 'function';
};

webapp.session_id_key = 'session_id';

/**
 *
 * @param url 请求url
 * @param param get请求参数
 * @param successFunc 成功回调函数
 * @param errorFunc 错误回调函数
 * @param method 请求方式 默认get
 * @param async 是否同步
 * @param is_sign 是否签名
 */
webapp.get = function ( url , param , successFunc , errorFunc , method , async , is_sign ) {
    param = param || [];
    this.loading();
    is_sign = is_sign || false;
    method  = method || 'get';
    
    if ( is_sign ) {
        if ( method === 'get' ) {
            url   = this.makeSign( url , param );
            param = {};
        } else {
            url = this.makeSign( url );
        }
    }
    
    $.ajax( {
        type     : method , data: param , url: url , dataType: 'json' , async: async , success: function ( response ) {
            webapp.closeLoading();
            if ( typeof successFunc === 'function' ) {
                successFunc( response );
            } else {
                throw new Error( 'successFunc not a function' );
            }
        } , error: function ( e ) {
            webapp.error( '网络错误啦！！' );
            webapp.closeLoading();
            if ( typeof errorFunc === 'function' ) {
                errorFunc( e );
            }
        }
    } )
};
/**
 * 签名
 * @param url
 * @param param URL参数对象或数组
 * @returns {string|*}
 */
webapp.makeSign = function ( url , param ) {
    try {
        param      = param || [];
        var params = this.getUrlParam( null , url ) , _tmpArr = [];
        if ( typeof params === 'string' ) params = [];
        params[ '_sign_nonce_str' ] = this.randomStn( 32 );
        params[ '_sign_time' ]      = this.current_time();
        params['_is_ajax']          ='1';
        params[ 'session_id' ]      = this.getSessionId() || '';
        delete params[ '_sign' ];
        delete param[ '_sign' ];
        for ( var i in params ) {
            param[ i ] = params[ i ];
        }
        var param_str = '';
        for ( var i in param ) {
            if ( param[ i ] != '' || typeof param[ i ] == 'number' ) {
                if ( param_str != '' ) param_str += '&';
                param_str += i + '=' + decodeURIComponent( param[ i ] );
            }
        }
        var _p_s = param_str + 'xsdsa9089sdfwe89u42342343213ds';
        
        param[ '_sign' ] = hex_sha1( BASE64.encoder( _p_s ) );
        url              = url.split( '?' );
        url[ 1 ]         = this.ArrToUrlParam( param );
        url              = url[ 0 ] + (
                url[ 1 ] == '' ? '' : '?'
            ) + url[ 1 ];
        return url;
    } catch ( e ) {
        console.log( e.message );
        webapp.error( e.message );
    }
    
};

/*
 * 产生任意长度随机字母数字组合
 */

webapp.randomStn = function ( len ) {
    len        = len || 32;
    var $chars = 'ABCDEFGHJKMNPQROSTWXYLZabcdefhijkOlmnprstwxyz12345678';
    var maxPos = $chars.length;
    var pwd    = '';
    for ( i = 0 ; i < len ; i++ ) {
        pwd += $chars.charAt( Math.floor( Math.random() * maxPos ) );
    }
    return pwd;
};

/**
 * post 请求
 * @param url 请求url
 * @param param get请求参数
 * @param successFunc 成功回调函数
 * @param errorFunc 错误回调函数
 * @param async 是否同步
 * @param is_sign 是否签名
 *
 */
webapp.post = function ( url , param , successFunc , errorFunc , async , is_sign ) {
    
    return this.get( url , param , successFunc , errorFunc , 'post' , async , is_sign );
};
/**
 * 获取多个checkbox 的值
 * @param name
 * @returns {string}
 */
webapp.getCheckboxValueByName = function ( name ) {
    var values = '';
    $( 'input[name="' + name + '"]:checked' ).each( function () {
        values += (
                      values == '' ? '' : ','
                  ) + $( this ).val();
    } );
    return values;
};

/**
 * 倒计时
 * @param $this
 */
webapp.countdown = function ( $this ) {
    //var $this = $('#doMobileVerify');
    var time = $this.attr( 'time' ) || 60;
    $this.attr( 'disabled' , true );
    var _t    = $this.text();
    app_timer = setInterval( function () {
        $this.text( _t + '(' + time + ')' );
        time--;
        if ( time < 0 ) {
            clearInterval( app_timer );
            $this.text( _t );
            $this.attr( 'disabled' , false );
        }
    } , 1000 );
};

/**
 * 当前时间戳,秒
 * @returns {number}
 */
webapp.current_time = function () {
    return Date.parse( new Date() ) / 1000;//当前时间戳,秒
};

webapp.getTimeLen = function ( time , timestamp ) {
    var _t     = time;//转成毫秒
    timestamp  = timestamp || this.current_time();//当前时间戳,秒
    var diff   = timestamp - _t;
    var result = '';
    if ( diff < 60 ) {
        result = diff + '秒前'
    } else if ( diff < 3600 ) {
        result = parseInt( diff / 60 ) + '分前'
    } else if ( diff < 3600 * 24 ) {
        result = parseInt( diff / 3600 ) + '小时前'
    } else if ( diff < (
            3600 * 24 * 3
        ) ) {
        result = parseInt( diff / 3600 / 24 ) + '天前'
    } else {
        result = webapp.date( 'MM-dd HH:mm' , time );
    }
    return result;
};

/*
 函数：格式化日期
 参数：formatStr-格式化字符串
 d：将日显示为不带前导零的数字，如1
 dd：将日显示为带前导零的数字，如01
 ddd：将日显示为缩写形式，如Sun
 dddd：将日显示为全名，如Sunday
 M：将月份显示为不带前导零的数字，如一月显示为1
 MM：将月份显示为带前导零的数字，如01
 MMM：将月份显示为缩写形式，如Jan
 MMMM：将月份显示为完整月份名，如January
 yy：以两位数字格式显示年份
 yyyy：以四位数字格式显示年份
 h：使用12小时制将小时显示为不带前导零的数字，注意||的用法
 hh：使用12小时制将小时显示为带前导零的数字
 H：使用24小时制将小时显示为不带前导零的数字
 HH：使用24小时制将小时显示为带前导零的数字
 m：将分钟显示为不带前导零的数字
 mm：将分钟显示为带前导零的数字
 s：将秒显示为不带前导零的数字
 ss：将秒显示为带前导零的数字
 l：将毫秒显示为不带前导零的数字
 ll：将毫秒显示为带前导零的数字
 tt：显示am/pm
 TT：显示AM/PM
 返回：格式化后的日期
 */
webapp.date = function ( formatStr , timestamp ) {
    
    var date = new Date();
    if ( !timestamp ) {
        
        return '';
    }
    timestamp=parseInt(timestamp );
    date.setTime( timestamp * 1000 );
    /*
     函数：填充0字符
     参数：value-需要填充的字符串, length-总长度
     返回：填充后的字符串
     */
    var zeroize = function ( value , length ) {
        if ( !length ) {
            length = 2;
        }
        value = new String( value );
        for ( var i = 0 , zeros = '' ; i < (
            length - value.length
        ) ; i++ ) {
            zeros += '0';
        }
        return zeros + value;
    };
    
    return formatStr.replace( /"[^"]*"|'[^']*'|\b(?:d{1,4}|M{1,4}|yy(?:yy)?|([hHmstT])\1?|[lLZ])\b/g , function ( $0 ) {
        switch ( $0 ) {
            case 'd':
                return date.getDate();
            case 'dd':
                return zeroize( date.getDate() );
            case 'ddd':
                return [ 'Sun' , 'Mon' , 'Tue' , 'Wed' , 'Thr' , 'Fri' , 'Sat' ][ date.getDay() ];
            case 'dddd':
                return [ 'Sunday' , 'Monday' , 'Tuesday' , 'Wednesday' , 'Thursday' , 'Friday' , 'Saturday' ][ date.getDay() ];
            case 'M':
                return date.getMonth() + 1;
            case 'MM':
                return zeroize( date.getMonth() + 1 );
            case 'MMM':
                return [ 'Jan' , 'Feb' , 'Mar' , 'Apr' , 'May' , 'Jun' , 'Jul' , 'Aug' , 'Sep' , 'Oct' , 'Nov' , 'Dec' ][ date.getMonth() ];
            case 'MMMM':
                return [
                    'January' , 'February' , 'March' , 'April' , 'May' , 'June' , 'July' , 'August' , 'September' , 'October' , 'November' ,
                    'December'
                ][ date.getMonth() ];
            case 'yy':
                return new String( date.getFullYear() ).substr( 2 );
            case 'yyyy':
                return date.getFullYear();
            case 'h':
                return date.getHours() % 12 || 12;
            case 'hh':
                return zeroize( date.getHours() % 12 || 12 );
            case 'H':
                return date.getHours();
            case 'HH':
                return zeroize( date.getHours() );
            case 'm':
                return date.getMinutes();
            case 'mm':
                return zeroize( date.getMinutes() );
            case 's':
                return date.getSeconds();
            case 'ss':
                return zeroize( date.getSeconds() );
            case 'l':
                return date.getMilliseconds();
            case 'll':
                return zeroize( date.getMilliseconds() );
            case 'tt':
                return date.getHours() < 12 ? 'am' : 'pm';
            case 'TT':
                return date.getHours() < 12 ? 'AM' : 'PM';
        }
    } );
};

/**
 * 日期转时间戳
 * @param stringTime
 * @param timeZone 时区,默认为东8区，北京时间
 * @returns {number}
 */
webapp.timestamp = function ( stringTime ,timeZone) {
    timeZone=timeZone||8;
    var _t=Date.parse( new Date( stringTime ) )-(3600000*timeZone);
    return _t;
};
webapp.setCookie = function ( name , value ) {
    
    var Days = 30;
    var exp  = new Date();
    exp.setTime( exp.getTime() + Days * 24 * 60 * 60 * 1000 );
    document.cookie = name + "=" + encodeURIComponent( value ) + ";expires=" + exp.toGMTString();
};

webapp.getCookie = function ( name ) {
    var arr , reg = new RegExp( "(^| )" + name + "=([^;]*)(;|$)" );
    if ( arr = document.cookie.match( reg ) )
        return decodeURIComponent( arr[ 2 ] ); else
        return null;
};
webapp.delCookie = function ( name ) {
    var exp = new Date();
    exp.setTime( exp.getTime() - 1 );
    var cval = this.getCookie( name );
    if ( cval !== null ) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
};
/**
 * 本地缓存
 * @param name 缓存名称
 * @param vaule 缓存值
 * @param expire 有效期 (秒)
 * @returns {*}
 */
webapp.cache = function ( name , vaule , expire ) {
    
    var data    = {};
    data.prefix = 'xxy';
    if ( typeof name !== 'string' || name === '' ) {
        return null;
    }
    name = data.prefix + name;
    if ( vaule === undefined ) {
        data = window.localStorage.getItem( name );
        if ( data ) {
            data    = JSON.parse( data );
            var now = webapp.current_time();
            
            if ( data.expire > 0 && (
                                        now - data.time
                                    ) > data.expire ) {
                localStorage.removeItem( name );
                return null;
            }
            return data.vaule;
        }
    } else if ( vaule === null ) {
        localStorage.removeItem( name );
        return true;
    } else {
        data.time   = this.current_time();
        data.expire = expire;
        data.vaule  = vaule;
        localStorage.setItem( name , JSON.stringify( data ) );
        return true;
    }
};

webapp.verifyError = function ( msg , obj , value , callback ) {
    webapp.error( msg );
    obj.focus();
    if ( webapp.isFunction( callback ) ) {
        callback( value , obj );
    }
};

/**
 * 获取表单数据，并校验
 * 校验类型：
 *
 * @param formId 表单id或demo对象
 * @param callback
 * @returns {{}}
 */
webapp.getParamData = function ( formId , callback ) {
    var param = {};
    var parent;
    if ( typeof formId === 'object' ) {
        parent = formId;
    } else {
        parent = $( '#' + formId );
    }
    $( '[param-name]' , parent ).each( function () {
        var _t        = $( this ) , name = _t.attr( 'param-name' );
        this.dataType = _t.attr( 'data-type' );
        if ( name ) {
            var v;
            if ( this.tagName === "INPUT" || this.tagName === 'TEXTAREA' || this.tagName==='SELECT' ) {
                if ( this.type === 'radio' ) {
                    if ( this.checked ) {
                        v  = $.trim( _t.val() );
                        param[ name ] = v;
                    }
                } else if ( this.type === 'checkbox' ) {
                    if ( this.checked ) {
                        v = $.trim( _t.val() );
                        if ( typeof param[ name ] === 'undefined' ) {
                            param[ name ] = v;
                        } else {
                            param[ name ] += ',' + v;
                        }
                    }
                } else {
                    v             = $.trim( _t.val() );
                    param[ name ] = v;
                }
            }else if( this.dataType === 'image' ){
                var imageClass = 'image_' + name, image = [];_t.addClass( imageClass );
                $('.'+imageClass).find('li').each( function(i){
                    image[i] = $(this).attr( 'url' );
                } );
                v             = $.trim( image.toString() );
                param[ name ] = v;
            }else {
                v             = $.trim( _t.text() );
                param[ name ] = v;
            }
            //城市选择类型的数据处理
            var valueType = $( this ).attr( 'valueType' );
            if ( valueType === 'province-city' && v) {
                param._province_id = $( this ).attr( 'province_id' );
                param._city_id     = $( this ).attr( 'city_id' );
                param._county_id   = $( this ).attr( 'county_id' );
                param.province     = $( this ).attr( 'province' );
                param.city         = $( this ).attr( 'city' );
                param.county       = $( this ).attr( 'county' );
            }
            if ( this.dataType ) {
                this.dataTypeArr = this.dataType.split( ',' );
                this.errorMsg    = _t.attr( 'error' ) || '';
                this.label       = _t.parent().siblings().text() || '';
                //校验
                // console.log(this.dataTypeArr);
                for ( var i in this.dataTypeArr ) {
                    this._d_type = this.dataTypeArr[ i ];
                    if ( !this._d_type )continue;
                    var _s           = this._d_type.split( ':' );
                    this._type       = _s[ 0 ];
                    this._type_value = _s[ 1 ];
                    switch ( this._type ) {
                        case 'mobile':
                            console.log('检验');
                            if( v===''){
                                webapp.verifyError( this.errorMsg || '请输入' + this.label , _t , v , callback );
                                param = false;
                                return false;
                            }else if( v.length != 11 ) {
                                webapp.verifyError( this.errorMsg || this.label + '长度不正确' , _t , v , callback );
                                param = false;
                                return false;
                            }else{
                                if ( !v.match( /^1\d{10}/ ) ) {
                                    webapp.verifyError(  this.errorMsg || this.label + '无效' , _t , v , callback );
                                    param = false;
                                    return false;
                                }
                            }
                            break;
                        case 'number':
                            if ( isNaN( v ) ) {
                                webapp.verifyError( this.errorMsg || this.label + ':不是有效数值' , _t , v , callback );
                                param = false;
                                return false;
                            }
                            break;
                        case 'int':
                            if ( v.match( /^(-|\+)?\d+$/ ) === null ) {
                                webapp.verifyError( this.errorMsg || this.label + ':不是整数' , _t , v , callback );
                                param = false;
                                return false;
                            }
                            break;
                        case 'required':
                            if ( v === '' ) {
                                webapp.verifyError( this.errorMsg || '请输入' + this.label , _t , v , callback );
                                param = false;
                                return false;
                            }
                            break;
                        case 'email':
                            if( v ){
                                if ( !webapp.isEmail( v ) ) {
                                    webapp.verifyError( this.errorMsg || this.label + '格式错误' , _t , v , callback );
                                    param = false;
                                    return false;
                                }
                            }
                            break;
                        case 'string':
                            if ( !/^[a-zA-Z0-9_]+$/.test( v ) ) {
                                webapp.verifyError( this.errorMsg || this.label + ':只能输入字母,数字,_' , _t , v , callback );
                                param = false;
                                return false;
                            }
                            break;
                        case 'pattern':
                            try {
                                console.log( this._type_value );
                                var reg = new RegExp( this._type_value );
                                if ( !reg.test( v ) ) {
                                    webapp.verifyError( this.errorMsg || this.label + ':无效' , _t , v , callback );
                                    param = false;
                                    return false;
                                }
                            } catch ( e ) {
                                console.error( e.message );
                            }
                            break;
                        case 'idcard' :
                            if( v==='' ){
//                                webapp.verifyError( this.errorMsg || '请输入' + this.label , _t , v , callback );
//                                param = false;
//                                return false;
                            }else{
                                if ( !webapp.isIdcard( v ) ) {
                                    webapp.verifyError( this.errorMsg || '身份证格式错误' , _t , v , callback );
                                    param = false;
                                    return false;
                                }
                            }
                            break;
                    }
                }
            }
        }
    } );
    return param;
};


/**
 * 获取表单数据，并校验
 * 校验类型：
 * @param formId   表单id或demo对象
 * @param callback
 * @param inputtype  是否校验部分输入框  1不校验
 * @returns {{}}
 */
webapp.obtaincheck = function ( formId , callback, inputtype ) {
    var param = {};
    var parent;
    if ( typeof formId === 'object' ) {
        parent = formId;
    } else {
        parent = $( '#' + formId );
    }
    $( '[param-name]' , parent ).each( function () {
        var _t        = $( this ) , name = _t.attr( 'param-name' ) , attributetype = _t.attr( 'judgmentattribute' );
        this.dataType = _t.attr( 'data-type' );
        if ( name ) {
            var v;
            if ( this.tagName === "INPUT" || this.tagName === 'TEXTAREA' || this.tagName==='SELECT' ) {
                if ( this.type === 'radio' ) {
                    if ( this.checked ) {
                        v             = $.trim( _t.val() );
                        param[ name ] = v;
                    }
                } else if ( this.type === 'checkbox' ) {
                    if ( this.checked ) {
                        v = $.trim( _t.val() );
                        if ( typeof param[ name ] === 'undefined' ) {
                            param[ name ] = v;
                        } else {
                            param[ name ] += ',' + v;
                        }
                    }
                } else {
                    v             = $.trim( _t.val() );
                    param[ name ] = v;
                }
            }else {
                v             = $.trim( _t.text() );
                param[ name ] = v;
            }
            //城市选择类型的数据处理
            var valueType = $( this ).attr( 'valueType' ), xinghao = '';
            if ( valueType === 'province-city' && v) {
                param._province_id = $( this ).attr( 'province_id' );
                param._city_id     = $( this ).attr( 'city_id' );
                param._county_id   = $( this ).attr( 'county_id' );
                param.province     = $( this ).attr( 'province' );
                param.city         = $( this ).attr( 'city' );
                param.county       = $( this ).attr( 'county' );
            }
            if ( this.dataType ) {
                this.dataTypeArr = this.dataType.split( ',' );
                this.errorMsg    = _t.attr( 'error' ) || '';
                xinghao          = _t.parent().siblings().find('span').text();
                if( xinghao ){
                    this.label   = xinghao;
                }else{
                    this.label   = _t.parent().siblings().text() || '';
                }
                //校验
                for ( var i in this.dataTypeArr ) {
                    this._d_type = this.dataTypeArr[ i ];
                    if ( !this._d_type )continue;
                    var _s           = this._d_type.split( ':' );
                    this._type       = _s[ 0 ];
                    this._type_value = _s[ 1 ];
                    if(attributetype==inputtype){
                        return false;
                    }else{
                        switch ( this._type ) {
                            case 'mobile':
                                if( v===''){
                                    webapp.verifyError( this.errorMsg || '请输入' + this.label , _t , v , callback );
                                    param = false;
                                    return false;
                                }else{
                                    if ( !v.match( /^1\d{10}/ ) ) {
                                        webapp.verifyError(  this.errorMsg || this.label + '无效' , _t , v , callback );
                                        param = false;
                                        return false;
                                    }
                                }
                                break;
                            case 'number':
                                if ( isNaN( v ) ) {
                                    webapp.verifyError( this.errorMsg || this.label + ':不是有效数值' , _t , v , callback );
                                    param = false;
                                    return false;
                                }
                                break;
                            case 'int':
                                if ( v.match( /^(-|\+)?\d+$/ ) === null ) {
                                    webapp.verifyError( this.errorMsg || this.label + ':不是整数' , _t , v , callback );
                                    param = false;
                                    return false;
                                }
                                break;
                            case 'required':
                                if ( v === '' ) {
                                    webapp.verifyError( this.errorMsg || '请输入' + this.label , _t , v , callback );
                                    param = false;
                                    return false;
                                }
                                break;
                            case 'email':
                                if( v===''){
                                    webapp.verifyError( this.errorMsg || '请输入' + this.label , _t , v , callback );
                                    param = false;
                                    return false;
                                }else{
                                    if ( !webapp.isEmail( v ) ) {
                                        webapp.verifyError( this.errorMsg || this.label + '格式错误' , _t , v , callback );
                                        param = false;
                                        return false;
                                    }
                                }
                                break;
                            case 'string':
                                if ( !/^[a-zA-Z0-9_]+$/.test( v ) ) {
                                    webapp.verifyError( this.errorMsg || this.label + ':只能输入字母,数字,_' , _t , v , callback );
                                    param = false;
                                    return false;
                                }
                                break;
                            case 'pattern':
                                try {
                                    console.log( this._type_value );
                                    var reg = new RegExp( this._type_value );
                                    if ( !reg.test( v ) ) {
                                        webapp.verifyError( this.errorMsg || this.label + ':无效' , _t , v , callback );
                                        param = false;
                                        return false;
                                    }
                                } catch ( e ) {
                                    console.error( e.message );
                                }
                                break;
                            case 'idcard' :
                                if( v==='' ){
                                    webapp.verifyError( this.errorMsg || '请输入' + this.label , _t , v , callback );
                                    param = false;
                                    return false;
                                }else{
                                    if ( !webapp.isIdcard( v ) ) {
                                        webapp.verifyError( this.errorMsg || '身份证格式错误' , _t , v , callback );
                                        param = false;
                                        return false;
                                    }
                                }
                                break;
                        }
                    }
                }
            }
        }
    } );
    return param;
};


//webapp.baseTime=0;
/**
 * 获取缓存
 * @param key
 */
webapp.getCache=function (key) {
    var storage = window.localStorage;
    this.baseTime=this.current_time();//当前时间截
    var obj=storage.getItem(key);
    if(obj){
        obj=JSON.parse(obj);
        if(obj && obj.expire<this.baseTime){
            storage.removeItem(key);
            return null;
        }else {
            return obj.value;
        }
    }
    return null;
};
/**
 * 设置缓存
 *
 * @param key
 * @param value
 * @param expire 有效时长（秒）
 */
webapp.setCache=function (key,value,expire) {
    expire=expire||0;
    var storage = window.localStorage;
    this.baseTime=this.current_time();//当前时间截
    var obj={};
    obj.value=value;
    obj.expire=this.baseTime+parseInt(expire);
    storage.setItem(key,JSON.stringify(obj));
};


webapp.filterUndefined = function ( obj ) {
    if(!$.isEmptyObject(obj)){
        for(var i in obj){
            if(typeof obj[i] ==='undefined'){
                delete obj[i];
            }
        }
    }
};

webapp._order_track_no = '';

/**
 * 显示更多菜单
 * @constructor
 */
webapp.ActionSheet = function (itme,text) {
    text = text || '';
    var $iosActionsheet = $('#iosActionsheet');
    var $iosMask = $('#iosMask');
    
    $iosActionsheet.show().addClass('weui-actionsheet_toggle');
    $iosMask.show();
    $iosActionsheet.find( '#ActionSheetTitle' ).text( text );
    if(itme){
        $iosActionsheet.find('#ActionSheetContent').html( itme );
        $("#ActionSheetContent .weui-actionsheet__cell").click(function () {
            $iosActionsheet.removeClass('weui-actionsheet_toggle').hide();
            $iosMask.hide();
        })
    }
    
};

webapp.hideActionSheet = function () {
    var $iosActionsheet = $('#iosActionsheet');
    function hideActionSheet() {
        $iosActionsheet.removeClass('weui-actionsheet_toggle').hide();
//        $iosMask.fadeOut(200);
        $iosMask.hide();
    }
    var $iosMask = $('#iosMask');
    $iosMask.on('click', hideActionSheet);
    $('#iosActionsheetCancel').on('click', hideActionSheet);
};

webapp.getUploadImage=function ( ParentId ) {
    var res=[];
    if(ParentId){
        $('#shopImageShow li',$('#'+ParentId)).each(function () {
            this.url=$(this).attr('url');
            res.push(this.url);
        });
        res=res.join(',');
    }else{
        $( '.formWidgetPanel[type="imageUpload"]' ).each( function () {
            var tag=$(this).attr('tag');
            res[tag]=[];
            $('#shopImageShow li',$(this)).each(function () {
                this.url=$(this).attr('url');
                res[tag].push(this.url);
            });
            res[tag]=res[tag].join(',');
        } );
    }
    return res;
};

webapp.getPcUploadImage=function ( ParentId ) {
    var res=[];
    if(ParentId){
        $('#shopImageShow li',$('#'+ParentId)).each(function () {
            console.log($(this));
            this.url=$(this).find('img').attr('url');
            if(!this.url){
                this.url=$(this).attr('url');
            }
            console.log(this.url);
            res.push(this.url);
        });
        res=res.join(',');
        console.log(res);
    }else{
        $( '.formWidgetPanel[type="imageUpload"]' ).each( function () {
            var tag=$(this).attr('tag');
            res[tag]=[];
            $('#shopImageShow li',$(this)).each(function () {
                this.url=$(this).attr('url');
                res[tag].push(this.url);
            });
            res[tag]=res[tag].join(',');
        } );
    }
    return res;
};

webapp.scrollDown=function (callback) {
    if(this.isFunction(callback)){
        $(document).on('scroll',function () {
            this.down_distance=document.body.clientHeight-document.body.scrollTop-window.outerHeight;
            callback(this.down_distance);
        })
    }
};
/**
 * 倒计时
 * @param selector
 * @param opd
 * @returns {boolean}
 */
webapp.countDownTime = function ( selector , options ) {
    
    var defaults = {
        startTime          : 0 ,//时间戳
        endTime            : 0 ,//时间戳
        daySelector        : ".day" ,
        hourSelector       : ".hour" ,
        minSelector: ".min" ,
        secSelector: ".sec" ,
        currentTime: 0 ,//当前时间戳
        beforeStartTip     : '敬请期待' ,//开始之前提示内容
        endTip             : '活动结束' ,//
        beforeStartCallback: null ,//开始之前回调
        running:null,//正常运行中回调
        endCallback        : null//会计结束回调
    };
    
    var intervalDate,day , hour , min , sec;
    var $this = $( selector );
    var _t    = this;
    
    if ( $this.length === 0 ) {
        console.error( '没有倒计时对象' );
        return false;
    }
    /**
     * 更新选项
     * @param options
     */
    this.update = function ( options ) {
        _t.opts           = $.extend( {} , defaults , options );
        _t.opts.endTime   = _t.opts.endTime > _t.opts.startTime ? _t.opts.endTime : _t.opts.startTime;
        _t.opts.startTime = _t.opts.endTime > _t.opts.startTime ? _t.opts.startTime : _t.opts.endTime;
    };
    
    $this.doubleNum    = function ( num ) { //将个位数字变成两位
        if ( num < 10 ) {
            return "0" + num;
        } else {
            return num + "";
        }
    };
    $this.beforeAction = function ( options ) {
        $( '.tip' , $this ).show().text( options.beforeStartTip || '敬请期待' );
        $( '.timeNumberText' , $this ).hide();
        if ( webapp.isFunction( options.beforeStartCallback ) ) {
            options.beforeStartCallback( $this );
        }
    };
    $this.afterAction  = function ( options ) {
        $( '.tip' , $this ).show().text( options.endTip || '活动已结束' );
        $( '.timeNumberText' , $this ).hide();
        if ( webapp.isFunction( options.endCallback ) ) {
            options.endCallback( $this );
        }
    };
    
    $this.doTime = function () {
        _t.opts.currentTime++;
        if ( _t.opts.startTime >= _t.opts.currentTime ) {
            $this.beforeAction( _t.opts );
        } else if ( _t.opts.endTime >= _t.opts.currentTime ) {
            //显示倒计时
            $( '.timeNumberText' , $this ).show();
            $( '.tip' , $this ).text( '' ).hide();
            var t = _t.opts.endTime - _t.opts.currentTime;
            day   = Math.floor( t / 60 / 60 / 24 );
            hour  = Math.floor( t / 60 / 60 % 24 );
            min   = Math.floor( t / 60 % 60 );
            sec   = Math.floor( t % 60 );
            $( _t.opts.daySelector , $this ).html( $this.doubleNum( day ) + "天" );
            $( _t.opts.hourSelector , $this ).html( $this.doubleNum( hour ) + "小时" );
            $( _t.opts.minSelector , $this ).html( $this.doubleNum( min ) + "分" );
            $( _t.opts.secSelector , $this ).html( $this.doubleNum( sec ) + "秒" );
            if(webapp.isFunction(_t.opts.running)){
                _t.opts.running();
            }
        } else {
            $this.afterAction( _t.opts );
            clearInterval( intervalDate );
        }
    };
    
    this.update(options);
    intervalDate = setInterval( function () {
        $this.doTime();
    } , 1000 );
    $this.doTime();
};

webapp.isWeixin = function () {
    var ua = window.navigator.userAgent.toLowerCase();
    if(/micromessenger/.test(ua)) {
        return true;
    } else {
        return false;
    }
};
