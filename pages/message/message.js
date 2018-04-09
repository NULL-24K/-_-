// pages/message/message.js
var util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemArr:[{jobName:'招商银行客服(纯接听)',interType:'申请成功',companyName:'招商银行',timeStr:'2018-4-8 08:08',iden:''},
            { jobName: '顺丰外呼业务', interType: '收到面试邀请', companyName: '顺丰快递公司', timeStr: '2018-3-8 08:09', iden: '' },
            { jobName: '海尔冰箱操作工', interType: '已拒绝面试邀请', companyName: '海尔集团', timeStr: '2018-3-5 12:08', iden: '' },
            { jobName: '总经理助理', interType: '没有获取面试机会', companyName: '安徽金蜜蜂人力资源有限公司', timeStr: '2018-3-3', iden: '' }],
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  pushDetail:function(e){
    
    var obj = this.data.itemArr[e.currentTarget.id];
    //console.log(obj)
    wx.navigateTo({
      url: './messageSubClass/interDetail?obj=' +JSON.stringify(obj),
    })
  }
})