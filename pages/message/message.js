// pages/message/message.js
var util = require('../../utils/util.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemArr:[],
    isHidden:true,
    isShowNotif:true,
    notifStr:''
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
    this.getMessageData();
    if (!app.isLogin()){
      this.setData({
        notifStr: '您尚未登录',
        isShowNotif:false
      })
    }else{
      this.setData({
        notifStr: '您还没有申请任何职位，去首页发现更多职位'
      })
    }
    
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
    this.getMessageData();
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

  getMessageData:function(){
    if (!app.isLogin()) {
      return;
    }
    var that = this;
    // wx.showLoading({
    //   title: '加载中...',
    // })
    wx.request({
      url: app.baseUrl+'message/msgList',
      method:'POST',
      data:{},
      header:app.header,
      success:function(res){
        var alertStr = ''
       // console.log(res.data)
        if(res.statusCode == 200){
          if(res.data.code ==0){
            if(res.data.data && res.data.data.length >0){
              that.setData({
                itemArr:res.data.data,
                isHidden: (res.data.data.length >10)?false:true,
                isShowNotif: (res.data.data.length == 0)?false:true
              })
            }else{
              alertStr ='您还没有申请任何职位'
              that.setData({
                itemArr: [],
                isHidden:true,
                isShowNotif:false
              })
            }
          }else{
            alertStr =res.data.msg
          }
        }else{
          alertStr = res.data.msg
        }
        if(alertStr.length > 0){
          
            wx.showToast({
              title: alertStr,
              icon: 'none'
            })
          
        }
      },
      complete:function(){
     //   wx.hideLoading()
      }
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

  pushDetail:function(e){
    
    var obj = this.data.itemArr[e.currentTarget.id];
    console.log(obj)
    wx.navigateTo({
      
      url: './messageSubClass/interDetail?obj=' +JSON.stringify(obj),
    })
  }
})