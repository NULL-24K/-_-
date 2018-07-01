// pages/message/message.js
var util = require('../../utils/util.js')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemArr: [],
    eye: true
  },

  pushDetailVC:function(index){
    var that = this;
    var obj = that.data.itemArr[index.currentTarget.id];
    wx.navigateTo({
      url: '../main/main?jobID=' + obj.ID + '&administratorId=' + obj.administratorId,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNetData();
    var shareId = options.shareId;
    console.log(shareId);
    
    if(shareId && shareId.length >0){
      wx.setStorageSync("shareId", shareId);
    }
    this.getUserInfoFun()
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
                console.log(result)
                if (result.data.code == 0 && result.data.data){
                  app.weChatInfo = result.data.data;
                  if (result.data.data.token){//如果已经使用手机号码注册 此处直接登录
                    wx.setStorageSync("AccountToken", result.data.data.token);
                  }
                  app.header={token: wx.getStorageSync('AccountToken') }
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
        console.log(res)
      }
    }
  },

  getNetData:function(){
    wx.showLoading({
      title: '正在加载',
    })
    var that = this;
    wx.request({
      url: app.baseUrl + 'jobs/jobList',
      method: 'POST',
      data: { type: 0, adminId: app.shareOrAdmin_ID()},
      success: function (res) {
        if (res.statusCode == 200) {
          var obj = res.data;
          //console.log(obj)
          if (obj.code == 0) {
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

// 1//index.js
// //获取应用实例
// const app = getApp()

// Page({
//   data: {
//     motto: 'Hello World',
//     userInfo: {},
//     hasUserInfo: false,
//     canIUse: wx.canIUse('button.open-type.getUserInfo'),
//     isSelectedBtn:false,
//     btnStr:'点击测试',
//   },
//   //事件处理函数
//   bindViewTap: function() {
//     wx.navigateTo({
//       url: '../logs/logs'
//     })
//   },
//   pushMain:function(){
//     wx.navigateTo({
//       url: '../main/main',
//     })
//   },
//   onLoad: function () {
//     if (app.globalData.userInfo) {
//       this.setData({
//         userInfo: app.globalData.userInfo,
//         hasUserInfo: true
//       })
//     } else if (this.data.canIUse){
//       // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
//       // 所以此处加入 callback 以防止这种情况
//       app.userInfoReadyCallback = res => {
//         this.setData({
//           userInfo: res.userInfo,
//           hasUserInfo: true
//         })
//       }
//     } else {
//       // 在没有 open-type=getUserInfo 版本的兼容处理
//       wx.getUserInfo({
//         success: res => {
//           app.globalData.userInfo = res.userInfo
//           this.setData({
//             userInfo: res.userInfo,
//             hasUserInfo: true
//           })
//         }
//       })
//     }
//   },
//   onClickBtn:function(){
//     this.setData({
//       isSelectedBtn: !this.data.isSelectedBtn,
//     })
//     this.setData({
//       btnStr: this.data.btnStr =='点击测试' ? '已经被点击了' : '点击测试'
//     })
//   },
//   getUserInfo: function(e) {
//     console.log(e)
//     app.globalData.userInfo = e.detail.userInfo
//     this.setData({
//       userInfo: e.detail.userInfo,
//       hasUserInfo: true
//     })
//   }
// })
