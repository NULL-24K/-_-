// pages/loginAndregister/login.js

var util = require('../../utils/util.js')
var app = getApp();
var interval = null
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iconImg:'/pages/images/other/icon.jpeg',
    numberImg:'/pages/images/other/signin_account_press@2x.png',
    psdImg:'/pages/images/other/signin_password_press@2x.png',
    phoneNum:'',
    psd:'',
    getMsgCode:'点击获取',
    currentTime: 61,
    disabled:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
    setTimeout(function () {
      wx.stopPullDownRefresh()
    }, 1000
    )
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  endInput:function(e){
    this.setData({
      phoneNum:e.detail.value
    })
  },

  endInputPsd:function(e){
    this.setData({
      psd: e.detail.value
    })
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
        console.log(res)
      }
    }
  },
  //获取短信验证码 
  getMsgFun:function(){
    var that = this
    var alertStr = '';
    if (this.data.phoneNum.length == 0) {
      alertStr = '账号不能为空'
    } else if (this.data.phoneNum.length != 11) {
      alertStr = '手机号码格式不正确';
    } 
    if (alertStr.length > 0) {
      wx.showToast({
        title: alertStr,
        icon: 'none'
      })
      return;
    }
    this.getCode();
    // wx.showLoading({
    //   title: '加载中',
    // })
    wx.request({
      url: app.baseUrl + 'account/getMsg',
      method: 'POST',
      data: { phoneNum: that.data.phoneNum },
      header: app.header,
      success: function (res) {
        var obj = res.data;
        if (obj.code == 0) {
          wx.showToast({
            title: '短信验证码发送成功',
            icon: 'none'
          })
        } else {
          wx.showToast({
            title: obj.msg,
            icon: 'none'
          })
        }
      },
      complete: function () {
       // wx.hideLoading()
      }
    })
    var that = this
    that.setData({
      disabled: true
    }) 
  },

  getCode:function(){
    var that = this;
    var currentTime = that.data.currentTime
    console.log(currentTime)
    interval = setInterval(function () {
      currentTime--;
      that.setData({
        getMsgCode: currentTime + '秒'
      })
      if (currentTime <= 0) {
        clearInterval(interval)
        that.setData({
          getMsgCode: '重新发送',
          currentTime: 61,
          disabled: false
        })
      }
    }, 1000)
   
  },

  logintap:function(){
    var alertStr = '';
/*
else if (!util.formatIsTrue(3, this.data.phoneNum)){
      alertStr='手机号码格式不正确';
    }
*/
    if(this.data.phoneNum.length == 0){
      alertStr = '账号不能为空'
    } else if (this.data.psd.length == 0){
      alertStr = '短信验证码不能为空'
    }else if(this.data.psd.length != 6){
      alertStr ='短信验证码格式不正确'
    }

    if(alertStr.length >0){
      wx.showToast({
        title: alertStr,
        icon:'none'
      })
      return;
    }
    
    app.userLogin({ phoneNum: this.data.phoneNum,psd:this.data.psd},function(code){
      if(code){
        setTimeout(
          function(){
            wx.navigateBack({
              
            })
          },1500
        )
      }
    })
    
  }

})