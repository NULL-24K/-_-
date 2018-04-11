// pages/loginAndregister/login.js

var util = require('../../utils/util.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iconImg:'/pages/images/other/icon.jpeg',
    numberImg:'/pages/images/other/signin_account_press@2x.png',
    psdImg:'/pages/images/other/signin_password_press@2x.png',
    phoneNum:'',
    psd:''
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
  
  },

  logintap:function(){
    var alertStr = '';

    if(this.data.phoneNum.length == 0){
      alertStr = '账号不能为空'
    } else if (this.data.psd.length == 0){
      alertStr = '密码不能为空'
    }else if (!util.formatIsTrue(3, this.data.phoneNum)){
      alertStr='手机号码格式不正确';
    }else if(this.data.psd.length < 6){
      alertStr='密码不能小于6位'
    }else if(this.data.psd.length > 20){
      alertStr='密码不能大于20位'
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