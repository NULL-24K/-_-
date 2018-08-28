// pages/message/message.js
var util = require('../../utils/util.js')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemArr: [],
    eye: true,
    locationCity:'获取定位中...',
    addressImg:'/pages/images/other/mood_addressImg.png'
  },

  pushDetailVC:function(index){
    var that = this;
    var obj = that.data.itemArr[index.currentTarget.id];
    wx.navigateTo({
      url: '../main/main?jobID=' + obj.ID + '&administratorId=' + obj.administratorId,
    })
  },

  chooesdLocation:function(){
    var that = this;
    wx.request({
      url: app.baseUrl + 'jobs/openCityInfo',
      header: app.header,
      method: 'POST',
      success: function (result) {
       // console.log(result);
        if (result.data.code ==1){
          var lisr = JSON.stringify(result.data.data);
          wx.navigateTo({
            url: '../main/location?location=' + that.data.locationCity + '&list=' + lisr,
          })
        }
      },
      complete: function () {

      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var shareId = options.shareId;
    console.log(shareId);
    var that = this;
    if(shareId && shareId.length >0){
      wx.setStorageSync("shareId", shareId);
    }
    this.getUserInfoFun()
    setTimeout(function(){
      that.getNetData();
    },100);
    this.getLocationFun();
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var _that = this;
    setTimeout(function(){
      _that.getNetData();
    },150);

    // var that = this;
    // if (app.isLogin() && !this.data.isReloadData) {
    //   this.setData({
    //     isReloadData:true
    //   })
    //   setTimeout(function () {
    //     if (that.data.isReloadData) {
    //       that.getNetData();
    //     }
    //   }, 100)
    // }
  },

  getLocationFun:function(){
     var locationInfo = wx.getStorageSync('locationKey_mfzp');
     var that = this;
     if (locationInfo) {
       
     }else{
       wx.getLocation({
         success: function(res) {
          
           wx.request({//https://ahgoldbee.cn/jobs/LocationCityInfo
             url: app.baseUrl + 'jobs/LocationCityInfo',
             method:'POST',
             data: { 'latitude': res.latitude,'longitude':res.longitude},
             success:function(successRes){
              // console.log(successRes)
               that.setData({
                 locationCity:successRes.data.data
               })
               setTimeout(function(){//延时0.1秒 重新获取职位信息
                 that.getNetData();
               },100);
             },
             complete: function () {

             }
           })
         },
         fail:function(err){
           //用户拒绝授权 显示授权失败，并在1.5秒后切换回默认地点
           that.setData({
             locationCity:'获取定位失败，即将切换至默认地址'
           })
           setTimeout(function(){
             that.setData({
               locationCity: '合肥'
             })
           },2000)
         }
       })
     }
  },

  getUserInfoFun: function () {
    var that = this;
    wx.getUserInfo({
      success: function (res) {
        app.globalData.userInfo = res.userInfo;
        that.setData({
          eye: true
        })
        wx.login({
          success: _res => {
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            
            wx.request({
              url: app.baseUrl +'account/weChatLogin',
              data: { code: _res.code},
              method: 'POST',    
              success: function (result) {
               // console.log(result)
                if (result.data.code == 0 && result.data.data){
                  app.weChatInfo = result.data.data;
                  if (result.data.data.token){//如果已经使用手机号码注册 此处直接登录
                    wx.setStorageSync("AccountToken", result.data.data.token);
                    //这里存储管理员信息
                    wx.setStorageSync('administorId', result.data.data.shareId);
                  }
                  app.header={token: wx.getStorageSync('AccountToken') }
                  setTimeout(function () {
                    that.getNetData();
                  }, 100);
                }//oiNIA5aC5uesE09NjZivIkhWG65U
              },
              complete:function(){

              }
            })
          }
        })
      },
      fail: that.showPrePage
    })
  },
  showPrePage: function () {
    this.setData({
      eye: false
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    setTimeout(function(){
      wx.stopPullDownRefresh()
    },1000
    )
    this.getNetData();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var shareId = app.shareOrAdmin_ID();
    return {
      title: '上蜜蜂直聘,发现更多机会',
      path: '/pages/index/index?shareId=' + shareId,
      success: function (res) {
       // console.log(res)
      }
    }
  },

  getNetData:function(){
    wx.showLoading({
      title: '正在加载',
    })
    var that = this;
    var reqdata = { type: 0, adminId: app.shareOrAdmin_ID()};
    if (that.data.locationCity !='获取定位中...'){
      reqdata.location = that.data.locationCity;
    }
   // console.log(reqdata)
    wx.request({
      url: app.baseUrl + 'jobs/jobList',
      method: 'POST',
      data: reqdata,
      success: function (res) {
        if (res.statusCode == 200) {
          var obj = res.data;
          console.log(obj);
          if (obj.code == 0) {
            for (var i = 0; i < obj.data.length;i++){
              if (obj.data[i].tagImgAddress == 'default') {
                obj.data[i].tagImgAddress = '/pages/images/other/cf_search_hot.png';
              }
            }
            that.setData({
              itemArr: obj.data
            })
          } else {}
        } else {
          wx.showToast({
            title: '网络异常,请重试',
          })
        }
      },
      complete: function () {
        wx.hideLoading();
      }
    })
  },

  userInfo:function(){
    if (app.globalData.userInfo) {
      // this.setData({
      //   userInfo: app.globalData.userInfo,
      //   hasUserInfo: true
      // })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        // this.setData({
        //   userInfo: res.userInfo,
        //   hasUserInfo: true
        // })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          // this.setData({
          //   userInfo: res.userInfo,
          //   hasUserInfo: true
          // })
        }
      })
    }
  }

})

