// pages/my/mySubClass/workList.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    workListArr: [{ title: '12', detail: '34', jobExprienceId: '1234' }, { title: '12', detail: '34', jobExprienceId: '4567'}]
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
    this.getNetData();
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

  getNetData:function(){
    var that = this;
   
    wx.request({
      url: app.baseUrl + 'users/workList',
      method: 'POST',
      header: app.header,
      success: function (res) {
        if (res.statusCode == 200) {
          var obj = res.data;
          if (obj.code == 0) {
            that.setData({
              workListArr: obj.data
            })
          } else {
            wx.showToast({
              title: obj.msg,
              icon: 'none'
            })
          }
        } else {
          wx.showToast({
            title: app.errorMsg,
            icon: 'none'
          })
        }
      },
      complete: function () {
      //  wx.hideLoading();
      }
    })
  },

  pushWorkDetail:function(e){
    var that = this;
    var workId = e.currentTarget.id;
    wx.navigateTo({
      url: './workExperience?id=' + workId,
    })
    
  },
})