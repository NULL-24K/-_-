// pages/main/location.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    locationddress:'合肥',
    addressList:[],
    locationIcon:'/pages/images/other/address_addNew.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     var list = options.list;
     var location_ = options.location;
     if(list){
       location_ += ' (当前选择)',
       list = JSON.parse(list);
       this.setData({
         locationddress: location_,
         addressList: list
       })
     }
  },

  selectdCity:function(index){
    console.log(index);
    var arr = getCurrentPages();
    var addressStr = this.data.addressList[index.currentTarget.id];
    wx.navigateBack({
      success:function(){
        arr[0].setData({
          locationCity: addressStr
        })
      }
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