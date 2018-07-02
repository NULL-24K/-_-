//app.js
App({
  onLaunch: function () {

    // 登录
    wx.login({
      success: res => {
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
  //.网络根地址
  baseUrl: 'https://ahgoldbee.cn/',
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
  //.用户的shareID或管理员ID
  shareOrAdmin_ID: function () {
    var admin_Id = wx.getStorageSync('administorId');
    var share_Id = wx.getStorageSync('shareId');
    //用户已存储shareID
    if (admin_Id && admin_Id.length > 0 && admin_Id != 'goldbee') {
      return admin_Id;
    } else {
      if (share_Id && share_Id.length > 0) {
        return share_Id;
      } else {
        return 'goldbee'
      }
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
    //if (wx.getStorageSync('shareId')){
    obj.shareId = that.shareOrAdmin_ID();
   // }
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
            //这里存储管理员信息
            wx.setStorageSync('administorId', obj.data.shareId);
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
  

//ffc4906e28d8eee49980349b61c65e70
  //https://api.weixin.qq.com/sns/jscode2session?appid=wxb516fc2328c18cea&secret=c61463205e4791a8bf15ff4af9771f5c&js_code=033JiSos13A7ko0UN9ms14YMos1JiSob&grant_type=authorization_code
})

/*

二、岗位职责
通过电话等方式向公司逾期客户进行款项回收。
三、岗位要求
全日制大专及以上学历，如具备催收经验，学历可放宽至高中或中专；表达、沟通能力良好；
抗压能力较好；期望挑战高薪。
四、薪资构成
1、薪资包含基本工资+提成，其中新人享受一个月新人保护津贴。
2、基本工资范围从2500-4000元，可根据工作经验评定基本工资；
3、提成标准为3000元，根据绩效达成情况，提成系数从0-3，即提成范围从0-9000元；
4、新人保护津贴为500元。
五、福利待遇
1、六险一金，按工资全额缴纳五险一金，公积金员工和公司的缴费比例各为10%；公司购买补充商业保险；
2、公司内部有互助基金，如遇重大疾病可申请；
3、每天免费水果供应；
4、生日福利及其他节日福利；
5、年度体检；
6、年休假；
*/