(
    function ( page ) {
        window.page = page();
    }( function () {
        var page = {};
        /**
         * 检测登录
         * @type {boolean}
         */
        page.isChkLogin = true;
        
        page.is_show_loading = false;
        /**
         * 是否显示加载框
         * @param is_show
         * @returns {page}
         */
        page.showLoad = function ( is_show ) {
            this.is_show_loading = is_show;
            return this;
        };
        
        page.get = function ( url , param , success , error , async , is_sign ) {
            if ( this.is_show_loading ) {
                webapp.loading();
            }
            webapp.get( url , param , function ( res ) {
                if ( page.isChkLogin ) {
                    page.doChkLogin( res );
                }
                if ( webapp.isFunction( success )) {
                    success( res );
                }
                
            } , error , 'get' , async , is_sign );
            this.is_show_loading = false;
        };
        /**
         * 获取路由路径数组
         * @returns {Array}
         */
        page.getPtRouterPathInfo = function () {
            var path;
            if ( location.hash.indexOf( '?' ) < 0 ) {
                path = location.hash;
            } else {
                path = location.hash.substr( 0 , location.hash.indexOf( '?' ) );
            }
            path = path.split( '/' );
            path.splice( 0 , 1 );
            return path;
        };
        
        /**
         * 判断登录
         * @param res
         */
        page.doChkLogin = function ( res ) {
            if ( res.code === 301 ) {
                webapp.error( res.msg || '跳转中' );
                setTimeout( function () {
                        var login = res.url
                                + '?return=' + encodeURIComponent( location.href );
                    if ( window.top !== window.self ) {
                        window.top.location = login;
                    } else {
                        window.location.href = login;
                    }
                } , 1000 );
            }
        };
        /**
         * post 请求
         * @param url
         * @param param
         * @param success
         * @param error
         * @param async
         * @param is_sign
         */
        page.post = function ( url , param , success , error , async , is_sign ) {
            webapp.post( url , param , function ( res ) {
                if ( page.isChkLogin ) {
                    page.doChkLogin( res );
                }
                if ( webapp.isFunction(success)) {
                    success( res );
                }
            } , error , async );
        };
        
        /**
         * 会话ID
         * @type {string}
         */
        page.session_id = '';
        
        /**
         * 页面get请求,调用API服务接口,并且做了未登录提示
         * @param pathInfo
         * @param param
         * @param successFunc
         * @param errorFunc
         */
        page.apiGet = function ( pathInfo , param , successFunc , errorFunc ) {
            param=param || {};
            param[webapp.session_id_key] = webapp.getSessionId();
            page.get( api_url + pathInfo , param , successFunc , errorFunc );
        };
        /**
         * get请求
         * @param url
         * @param param
         * @param successFunc
         * @param errorFunc
         */
        page.get = function ( url , param , successFunc , errorFunc ) {
            param = param || {};
            webapp.get( url , param , function ( res ) {
                if ( page.isChkLogin ) {
                    page.doChkLogin( res );
                }
                if ( typeof successFunc === 'function' ) {
                    successFunc( res );
                }
            } , errorFunc , 'get' , true , true );
        };

        /**
         * 初始加密
         * @param password
         * @param secretKey
         * @returns {*}
         */
        page.enPassword = function ( password , secretKey ) {
            return hex_sha1( BASE64.encoder( password ) + secretKey );
        };

      
        page.deleteImage = function ( obj ) {
            
            $(obj).parent().remove();
        };
        
        page.apiPost = function ( pathInfo , param , successFunc , errorFunc ) {
            webapp.post( api_url || '/' + pathInfo , param , function ( res ) {
                if ( page.isChkLogin ) {
                    page.doChkLogin( res );
                }
                if ( typeof successFunc === 'function' ) {
                    successFunc( res );
                }
            } , errorFunc , true , true );
        };
       
        page.wxIsInit = false;
        page.shartData = {
            title: '协协通', // 分享标题
            link: location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: "",
            desc:''
        };
        page.ShareTimeline = {
            title: '协协通', // 分享标题
            link: location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: "",
            desc:''
        };
        page.wxInitCallback = [];
        page.wxConfig = function (url,callback) {
            webapp.is_show_loading=false;
            page.apiPost( url , {url: location.href} , function ( res ) {
                 if(res.code === 0){
                     var configData = {};
    
                     configData.debug = false;
                     configData.appId= res.data.appid;
                     configData.timestamp = res.data.timestamp;
                     configData.nonceStr = res.data.noncestr;
                     configData.signature = res.data.sign;
                     configData.jsApiList = ['onMenuShareTimeline',
                                             'onMenuShareAppMessage',
                                             'onMenuShareQQ',
                                             'onMenuShareWeibo',
                                             'onMenuShareQZone',
                                             'startRecord',
                                             'stopRecord',
                                             'onVoiceRecordEnd',
                                             'playVoice',
                                             'pauseVoice',
                                             'stopVoice',
                                             'onVoicePlayEnd',
                                             'uploadVoice',
                                             'downloadVoice',
                                             'chooseImage',
                                             'previewImage',
                                             'uploadImage',
                                             'downloadImage',
                                             'translateVoice',
                                             'getNetworkType',
                                             'openLocation',
                                             'getLocation',
                                             'hideOptionMenu',
                                             'showOptionMenu',
                                             'hideMenuItems',
                                             'showMenuItems',
                                             'hideAllNonBaseMenuItem',
                                             'showAllNonBaseMenuItem',
                                             'closeWindow',
                                             'scanQRCode',
                                             'chooseWXPay',
                                             'openProductSpecificView',
                                             'addCard',
                                             'chooseCard',
                                             'openCard'];
                     configData.success = function () {
                     };
                     configData.error = function ( message ) {
                         console.log( message )
                     };
    
                     wx.error( function () {
        
                     } );
//                     page.friend.success=function () {
//                        alert('111');
//                     };
//                     page.shartData.cancel = function () {
//
//                     };
                     
                     wx.ready( function () {
                         page.wxIsInit = true;
//                         webapp.alert('微信初始化成功');
                         /**
                          * 分享朋友圈
                          */
                         wx.onMenuShareTimeline(page.ShareTimeline);
                         /**
                          * 分享给朋友
                          */
                         wx.onMenuShareAppMessage(page.shartData);
                         
                         wx.onMenuShareQQ(page.shartData);
                         
                         if(webapp.isFunction(callback)){
                             callback(configData);
                         }
                         for (var i in page.wxInitCallback){
                             if(webapp.isFunction(page.wxInitCallback[i])){
                                 page.wxInitCallback[ i ](configData);
                             }
                         }
                         page.wxInitCallback=[];
                     } );
                     wx.config(configData);
                 }
            } );
        };
        
        
        
        //调用微信JS api 支付
        page.jsApiCall=function ( res ,flag) {
            if ( res ) {
                WeixinJSBridge.invoke( 'getBrandWCPayRequest' ,res , function ( res2 ) {
                    if ( res2.err_msg === "get_brand_wcpay_request:ok" ) {
                        if(flag){
                            webapp.success('支付成功',1500,flag);
                        }
                    }
                } );
            }
        };
        page.callpay =function ( res,flag ) {
            if ( typeof WeixinJSBridge == "undefined" ) {
                if ( document.addEventListener ) {
                    document.addEventListener( 'WeixinJSBridgeReady' , page.jsApiCall , false );
                } else if ( document.attachEvent ) {
                    document.attachEvent( 'WeixinJSBridgeReady' , page.jsApiCall );
                    document.attachEvent( 'onWeixinJSBridgeReady' , page.jsApiCall );
                }
            } else {
                page.jsApiCall(res,flag);
            }
        };
        /**
         *
         * @param options
         * options.initTipId
         *
         * @returns {boolean}
         */
        page.pageListPanel = function ( options ) {
            var _this=this;
            this.is_loading = false;
            this.page=1;
            if(typeof options !=='object'){
                options = {};
            }
            options.panelId         = options.panelId || 'pageListPanel';
            options.initTipId       =options.initTipId||'initTipText';
            options.loadMoreBtnId   = options.loadMoreBtnId || 'moreBtn';
            options.loadMoreBtnText = options.loadMoreBtnText || '点击加载更多';
            options.urlParams       = options.urlParams || {};
           
            this.pageListPanelObj   = $( '#' + options.panelId );
            if(this.pageListPanelObj.length==0){
                console.error( 'pageListPanel not found DOM' );
                return false;
            }
            this.initTipText=$( '#' + options.initTipId,this.pageListPanelObj );
            this.moreBtn = $( '#' + options.loadMoreBtnId , this.pageListPanelObj );
            this.moreBtnText = $( '#loadMoreText' , _this.moreBtn );
            if(options.loadMoreBtnId){
                this.moreBtnText.text(options.loadMoreBtnText);
            }
            this.loadingText = $( '.loadingText' , this.initTipText );
            if(options.initTipText){
               this.loadingText.text( options.initTipText );
            }
            if(!options.url){
                console.error( 'url is empty' );
                return false;
            }
            /**
             * 没有数据
             * @param res
             */
            this.setNotData = function ( res ) {
                if ( res.code === 30120 || (
                        res.data && res.data.page && res.data.page.totalPage === 0
                    ) ) {
                    _this.moreBtn.hide();
                    this.loadingText.show().loadingText.text( '没有数据' );
                }else {
                    this.loadingText.hide();
                }
            };
            /**
             *
             */
            this.setNotMore = function () {
                _this.moreBtn.attr('isMore',0);
                _this.moreBtnText.text( '没有更多了' );
            };
            /**
             *
             */
            this.setLoadingText = function () {
                this.loadingText.show().text( '正在加载中...' );
            };
            this.setLoadError = function () {
                this.loadingText.show().text( '抱歉，加载出错啦！' );
            };
    
            this.loadUrl = function () {
                if(this.is_loading)return;
                this.is_loading = true;
                this.setLoadingText();
                page.apiGet( options.url , options.urlParams , function ( res ) {
                    _this.initTipText.hide();
                    _this.is_loading = false;
                    if(webapp.isFunction(options.callBack)){
                        options.callBack(res);
                    }
                    if(res.code===0){
                        if(res.data.page.current === res.data.page.totalPage){
                            _this.setNotMore();
                        }
                        _this.moreBtn.show();
                    }else {
                        webapp.error( res.msg );
                    }
                } ,function () {
                    _this.is_loading = false;
                    _this.setLoadError();
                });
            };
            _this.moreBtn.on( 'click' , function () {
                if ( $( this ).attr( 'isMore' ) != 0 ) {
                    _this.nextPage();
                }
            } );
            this.nextPage = function () {
                this.page++;
                _this.initTipText.show();
                _this.moreBtn.hide();
                options.urlParams.page = this.page;
                    _this.loadUrl();
            };
            this.loadUrl();
        };
        
        /**
         * 获取首页链接
         * @param tag
         * @returns {string}
         */
        page.challengeDetail = function ( tag ) {
            var challengeDetailUrl = '/challengeDetail?tag=' + tag;
            return challengeDetailUrl;
        };
        /**
         * 获取参与者页面链接
         * @param tag
         * @returns {string}
         */
        page.participant = function ( tag ) {
            var participantUrl = '/participant?tag=' + tag;
            return participantUrl;
        };
    
        /**
         * 赞助商页面链接
         * @param tag
         * @returns {string}
         */
        page.sponsorShow = function ( id ) {
            var sponsorShowUrl = '/sponsorShow?id=' + id;
            return sponsorShowUrl;
        };
        
    
        /**
         * 弹出框
         */
        page.popOut = function(title,btnTest,change,click,useCancel) {
            var overflow = "";
            var $hidder = null;
            var clickHandler = click || $.noop;
            var myClickHandler = function () {
                $hidder.remove();
                $("body").css("overflow", overflow);
            };
            var withdrawClickBtn = function(){
                clickHandler($(this).html() == btnTest);
            };
            var init = function () {
                $hidder = $("<div id='hidder' style='width:100%;height:100%;background:rgba(0,0,0,0.6);z-index:100;text-align: center;position:fixed;left:0;top:0;'></div>");
                var $popout = $( '<div id="withdraw" style="border-radius: 8px;">'+
                             '<div class="weui-cell" id="border-top" style="color:#fff;font-size: .4rem;background:#1aad19;border-radius: 8px;border-bottom-left-radius: 0px;border-bottom-right-radius: 0px;">'+
                             '<div class="weui-cell__bd">'+
                             '<p>'+title+'</p>'+
                             '</div>'+
                             '</div>'+
                             '<div class="weui-cell">'+
                             '<div class="weui-cell__bd" style="font-size: 20px;color:#000">￥'+
                             '<input class="weui-input" type="number" id="inputMoney" style="width: 80%;height: .8rem">'+
                             '</div>'+
                             '</div>'+
                             '</div>').appendTo($hidder);
                
                var $popout_btn_off = $('<span id="off" class="iconfont icon-delete absolute" style="right:-.1rem;top:-.3rem;z-index: 1000"></span>');
                $popout.prepend($popout_btn_off);
                $popout_btn_off.click(myClickHandler);
                if(useCancel){
                    var $totleMoney = $('<div class="weui-cell">'+
                                        '<div class="weui-cell__bd" style="text-align: left">'+
                                        '<p id="withdraw-center">当前零钱'+change+
                                        '<span id="withdraw-money">'+
                                        '</span>元'+
                                        '<span style="color:#1e90ff" id="withdrawAll"></span>'+
                                        '</p>'+
                                        '</div>'+
                                        '</div>').appendTo($popout);
                }
                var $withdrawBtn = $('<div class="padding-20">'+
                                     '<div class="weui-btn weui-btn_primary" id="withdrawBtn">'+
                                     '<div>'+btnTest+'</div></div></div>').appendTo($popout).click(withdrawClickBtn);
                overflow = $("body").css("overflow");
                $("body").css("overflow", "hidden").append($hidder);
            };
            init();
            if(useCancel){
                $('#inputMoney').on('input propertychange',function (  ) {
                    inputMoney = $('#inputMoney').val();
                    if( (inputMoney<1) || (inputMoney>change) ){
                        $('#withdrawBtn').addClass('weui-btn_disabled');
                        if(inputMoney<1){
                            $('#withdraw-center').text('提现金额需大于1元').addClass('red');
                        }else if(inputMoney>change){
                            $('#withdraw-center').text('提现金额超过零钱金额').addClass('red');
                        }
                    }else{
                        $('#withdrawBtn').removeClass('weui-btn_disabled');
                        $('#withdraw-center').text("当前零钱"+change+"元").removeClass('red');
                    }
                });
            }
            $('#withdrawBtn').addClass('weui-btn_disabled');
        };
        /**
         *
         */
        page.popOutText = function ( url,hash ) {
            const _this = this;
            param = {};
            param.money = $( '#inputMoney' ).val();
            param.hash = hash;
            if( $( '#withdrawBtn' ).is( '.weui-btn_disabled' ) ) {
                return false
            }
            $('#withdrawBtn').addClass('weui-btn_disabled');
            $( '#hidder' ).hide();
            //console.log(param);
            page.apiPost( url,param, function ( res ) {
                //console.log( res );
                if ( res.code === 0 ) {
                    webapp.alert( '您的提现已提交</br>提现金额会在24小时内到账' , function () {
                        window.location = window.location;
                    } );
                } else {
                    webapp.error( res.msg );
                    setTimeout(function (  ) {
                        window.location = window.location;
                    },1000)
                }
            })
        };
        return page;
    } )
);

