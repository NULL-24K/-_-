// pages/message/message.js
var util = require('../../utils/util.js')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemArr: [],
  },

  pushLogin: (index) => {

    util.userLogin();
    return

    var name = '';//index.currentTarget.dataset.types;
    wx.navigateTo({
      url: '../main/main?titles=' + name,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var arr = [];
    for (var i = 0; i < 8; i++) {
      var dataDic = {
        title: (i%2==0)?'客服专员':'项目主管',
        image: (i % 2 == 0) ? '/pages/images/my_sel.jpg' : '/pages/images/main_def.jpg',
        detailText: (i % 2 == 0)?'交通银行催收':'科大讯飞项目负责人',
        location: (i % 2 == 0) ?'明珠广场':'蜀山区',
        money: (i % 2 == 0) ?'6k~8k':'20k~30k',
        timestr: (i % 2 == 0) ?'03月24日':'02月08日',
        xueli: (i % 2 == 0) ?'大专':'研究生',
        yaoqiu: (i % 2 == 0) ?'不限':'5年以上'
      }
      arr.push(dataDic)
    }
    this.setData({
      itemArr: arr,
    })
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

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
