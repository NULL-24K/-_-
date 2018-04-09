// pages/message/messageSubClass/interDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataArr:[{timeStr:'2018-4-8',stateStr:'拒绝面试',state:'1'},
      { timeStr: '2018-4-7', stateStr: '收到面试邀请', state: '0' },
      { timeStr: '2018-4-3', stateStr: '申请成功', state: '0' }],
    titleStr:'',
    detailStr:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var obj = JSON.parse(options.obj)
    console.log(obj.jobName)
    this.setData({
      titleStr: obj.jobName,
      detailStr:'7000-12000'
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
  
  },

  pushCompany:function(){
    wx.navigateTo({
      url: '/pages/main/main',
    })
  }
})