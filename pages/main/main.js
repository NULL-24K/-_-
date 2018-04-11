// pages/main/main.js

 var util = require('../../utils/util.js')
 var app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    jobName:'顺丰纯接听客服',
    jobIncom:'3000-8000',
    singerLocation:'滨湖',
    dio:'本科',
    jobYears:'3年以上',
    applyNum:'8',
    wellArr:['五险一金','下午茶','定期体检','加班双薪','季度旅游','美女如云'],
    interviewTime:'4月20日 上午',
    interViewLocation:'合肥市蜀山区莲花路莲花电子产业园D栋503',
    jobLocation:'合肥市蜀山区莲花路莲花电子产业园D栋503',
    jobDescribe: '关注“失控奔驰车”事件的最新进展。上周，央视新闻频道《法治在线》栏目连续两天播出了针对这一事件调查，4月8日晚上，栏目组收到了奔驰公司专门给法治在线发来的一封情况说明。在这份情况说明当中，奔驰方面首次公布了对车辆情况的初步分析结果，初步判断车辆的定速巡航系统及驾驶系统当晚运行正常，并表示正在与薛先生沟通下一步的车辆检测工作。同时，车主薛先生也表示，希望可以尽快检测车辆，回归正常生活。这份《关于薛先生用车经历的进一步情况说明》提到，目前已有的相关车辆的技术信息，包括当晚从车辆中远程获取的信息，显示相关系统在事发当晚运行正常，包括大家关注的定速巡航及制动系统等。',
    applyState:'立即申请'
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

  interview:function(){
    if (!app.isLogin()){
      util.userLogin();
    }else{
      wx.navigateBack({
        
      })
    }
  }
})