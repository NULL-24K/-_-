// pages/message/messageSubClass/interDetail.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataArr: [],
    titleStr:'',
    detailStr:'',
    intenViewObj:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var obj = JSON.parse(options.obj)
    // console.log(obj)
    this.setData({
      titleStr: obj.jobName,
      detailStr:'7000-12000',
      intenViewObj:obj
    });
    this.getNetData()
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

  getNetData:function(){
    //msgDetail
    var that = this;
    // wx.showLoading({
    //   title: '加载中...',
    // })
    wx.request({
      url: app.baseUrl + 'message/msgDetail',
      method: 'POST',
      data: { orderId: that.data.intenViewObj.orderId},
      header: app.header,
      success: function (res) {
        var alertStr = ''
        var obj = res.data;
        if (res.statusCode == 200) {
          if (obj.code == 0) {
            if (obj.data && obj.data.length > 0) {
              var resArr = []
              for(var i =0;i<obj.data.length;i++){
                var detailObj = { timeStr: obj.data[i].updatedAt, status: obj.data[i].intentionStatus}
                detailObj.detail = that.detailFromStatus(obj.data[i].intentionStatus);
                detailObj.isSuccess = that.isSuccessTypeFromStatus(obj.data[i].intentionStatus);
                detailObj.lineCol = (that.isSuccessTypeFromStatus(obj.data[i].intentionStatus) == true)?'green':'red'
                resArr.push(detailObj);
              }
              that.setData({
                dataArr :resArr
              })
            } else {
              alertStr = ''
              
            }
          } else {
            alertStr = res.data.msg
          }
        } else {
          alertStr = res.data.msg
        }
        if (alertStr.length > 0) {
          
            wx.showToast({
              title: alertStr,
              icon: 'none'
            })
        }
      },
      complete: function () {
       // wx.hideLoading()
      }
    })
  },

  detailFromStatus:function(status){
    var returnStr = '您已经成功申请该职位，HR正在努力为您服务，如有反馈，我们将尽快通知您！';
    if (status =='已邀请面试'){
      returnStr = 'HR已通知您参加面试，请在规定时间内参加面试，预祝您面试顺利'
    } else if (status == '放弃面试'){
      returnStr = '您放弃了此次面试机会，建议您去看看其他职位'
    } else if (status == '已面试') {
      returnStr = '您已经参加该单位面试'
    } else if (status == '没有获得面试机会') {
      returnStr = '非常抱歉，你没有获得面试，你可以去首页发现更多工作机会'
    }  
    return returnStr;
  },

  isSuccessTypeFromStatus:function(status){
    var returnType = true;
    if (status == '已邀请面试') {
      returnType = true
    } else if (status == '放弃面试') {
      returnType = false
    } else if (status == '已面试') {
      returnType = true
    } else if (status == '没有获得面试机会') {
      returnType = false
    }
    return returnType;
  },

  pushCompany:function(){
    var that = this;
    wx.navigateTo({
      url: '../../main/main?jobID=' + that.data.intenViewObj.jobId + '&administratorId=' + that.data.intenViewObj.administratorId,
    })
  }
})