//app.js
App({
  onLaunch: function () {
    // // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // var that = this;
        // wx.request({
        //   url: this.baseUrl +'account/weChatLogin',
        //   data: {code:res.code},
        //   method: 'POST',    
        //   success: function (result) {
        //     console.log(result)
        //     if (result.data.code == 0 && result.data.data){
        //       that.weChatInfo = result.data.data;
        //       if (result.data.data.token){//如果已经使用手机号码注册 此处直接登录
        //         wx.setStorageSync("AccountToken", result.data.data.token);
        //       }
        //       that.header={token: wx.getStorageSync('AccountToken') }
        //     }
        //   },
        //   complete:function(){

        //   }
        // })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  },
  //微信openID信息
  weChatInfo:{
    session_key:null,
    openid:null
  },

  baseUrl: 'https://ahgoldbee.cn/',//'http://193.112.186.75:3000/',//http://localhost:3000/',
  errorMsg:'网络异常,请重试',
  header:{token:wx.getStorageSync('AccountToken')},
  /*用户是否登录*/
  isLogin:function(){
    var value = wx.getStorageSync('AccountToken');
    if(value && value.length > 0){
      return true;
    }else{
      return false;
    }
  },

  userLogin:function(obj,callBack){
    var that = this;
    
    if (that.weChatInfo.session_key){
      obj.session_key = that.weChatInfo.session_key
    }
    if (that.weChatInfo.openid) {
      obj.openid = that.weChatInfo.openid
    }2
    if (wx.getStorageSync('shareId')){
      obj.shareId = wx.getStorageSync('shareId');
    }
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url:that.baseUrl +'account/Login',
      data:obj,
      method:'POST',
      success:function(res){
       // console.log(res);
        if(res.statusCode == 200){//请求成功
          var  obj = res.data;
          if(obj.code == 0){//登录成功
            wx.setStorageSync("AccountToken", obj.data.token);
            wx.setStorageSync('shareId', obj.data.shareId);
            that.header.token = obj.data.token;
            wx.showToast({
              title: obj.msg,
            })
            callBack(true);
          }else{
            wx.showToast({
              title: obj.msg,
            })
          }
        }
      },
      fail:function(){

      },
      complete:function(){
        wx.hideLoading();
      }
    })
  },


  shareInfo:function(){
    var shareId = wx.getStorageSync("shareId");
    return {
      title: '小程序测试转发',
      path: '/pages/index/index?shareId=' + shareId,
      success: function (res) {
        console.log(res)
      }
    }
  }
//ffc4906e28d8eee49980349b61c65e70
  // /**
  // * 接口公共访问方法
  // * @param {Object} urlPath 访问路径
  // * @param {Object} params 访问参数（json格式）
  // * @param {Object} requestCode 访问码，返回处理使用
  // * @param {Object} onSuccess 成功回调
  // * @param {Object} onErrorBefore 失败回调
  // * @param {Object} onComplete 请求完成（不管成功或失败）回调
  // * @param {Object} isVerify 是否验证重复提交
  // * @param {Object} requestType 请求类型（默认POST）
  // * @param {Object} retry 访问失败重新请求次数（默认1次）
  // */
  // webCall: function (urlPath, params, requestCode, onSuccess, onErrorBefore, onComplete, isVerify, requestType, retry) {
  //   var params = arguments[1] ? arguments[1] : {};
  //   //var requestCode = arguments[2] ? arguments[2] : 1;
  //   var onSuccess = arguments[3] ? arguments[3] : function () { };
  //   var onErrorBefore = arguments[4] ? arguments[4] : this.onError;
  //   var onComplete = arguments[5] ? arguments[5] : this.onComplete;
  //   var isVerify = arguments[6] ? arguments[6] : false;
  //   var requestType = arguments[7] ? arguments[7] : "POST";
  //   var retry = arguments[8] ? arguments[8] : 1;
  //   var that = this;
    
  //   console.log(that.apiHost);

   
  //   //防止重复提交，相同请求间隔时间不能小于500毫秒
  //   var nowTime = new Date().getTime();
  //   if (this.requestCount[urlPath] && (nowTime - this.requestCount[urlPath]) < 500) {
  //     return;
  //   }
  //   this.requestCount[urlPath] = nowTime;
  //   //是否验证重复提交
  //   if (isVerify) {
  //     if (this.verifyCount[urlPath]) {
  //       return;
  //     }
  //     this.verifyCount[urlPath] = true; //重复验证开关开启
  //   }

  //   console.log("发起网络请求, 路径:" + (that.apiHost + urlPath) + ", 参数:" + JSON.stringify(params));
  //   wx.request({
  //     url: that.apiHost + urlPath,
  //     data: params,
  //     method: requestType, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
  //     header: {
  //       'content-type': requestType == 'POST' ?
  //         'application/x-www-form-urlencoded' : 'application/json'
  //     }, // 设置请求的 header
  //     success: function (res) {
  //       console.log("返回结果：" + JSON.stringify(res.data));
  //       if (res.data) {
  //         if (res.data.statusCode == 200) { //访问成功
  //           onSuccess(res.data, requestCode);
  //         } else if (res.data.statusCode == 300000001) { // 未登录
  //           that.isLogin = false;
  //           onErrorBefore(0, res.data.message, requestCode);
  //         } else {
  //           onErrorBefore(0, res.data.message == null ? "请求失败 , 请重试" : res.data.message, requestCode);
  //         }
  //       } else {
  //         onErrorBefore(0, "请求失败 , 请重试", requestCode);
  //       }
  //     },
  //     fail: function (res) {
  //       retry--;
  //       console.log("网络访问失败：" + JSON.stringify(res));
  //       if (retry > 0) return that.webCall(urlPath, params, requestCode, onSuccess, onErrorBefore, onComplete, requestType, retry);
  //     },
  //     complete: function (res) {
  //       onComplete(requestCode);
  //       //请求完成后，2秒后重复验证的开关关闭
  //       if (isVerify) {
  //         setTimeout(function () {
  //           that.verifyCount[urlPath] = false;
  //         }, 2000);
  //       }
  //     }
  //   })
  // }
  //https://api.weixin.qq.com/sns/jscode2session?appid=wxb516fc2328c18cea&secret=c61463205e4791a8bf15ff4af9771f5c&js_code=033JiSos13A7ko0UN9ms14YMos1JiSob&grant_type=authorization_code
})