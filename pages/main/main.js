// pages/main/main.js

 var util = require('../../utils/util.js')
 var app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    jobName:'',
    jobIncom:'',
    singerLocation:'',
    dio:'',
    jobYears:'',
    applyNum:'',
    wellArr:[],
    interviewTime:'',
    interViewLocation:'',
    jobLocation:'',
    jobDescribe: '',
    applyState:'立即申请',
    jobid:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.jobID;
     var that = this;
     wx.showLoading({
       title: '加载中...',
     })
     wx.request({
       url: app.baseUrl +'jobs/jobDetail',
       method:'POST',
       data: { jobID: id},
       header:app.header,
       success:function(res){
         if(res.statusCode == 200){
           var obj = res.data;
           if(obj.code == 0 && obj.data){
             console.log(typeof obj.data.wellArr)
             that.setData({
               jobName: obj.data.jobName,
               jobIncom: obj.data.jobIncom,
               singerLocation: obj.data.singerLocation,
               minEducation: obj.data.minEducation,
               workExperienc: obj.data.workExperienc,
               applyNum: obj.data.applyNum,
               wellArr: obj.data.wellArr,
               interviewTime: obj.data.interviewTime,
               interViewLocation: obj.data.interViewLocation,
               jobLocation: obj.data.jobLocation,
               jobDescribe: obj.data.jobDescribe,
               applyState: obj.data.applyState,
             })
           }else{
             wx.showToast({
               title: obj.msg,
               icon:'error'
             })
           }
         }else{
           wx.showToast({
             title: '网络异常,请重试',
             icon:'error'
           })
         }
       },
       complete:function(){
         wx.hideLoading();
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
  
  },

  interview:function(){
    var that = this;
    if (!app.isLogin()){
      util.userLogin();
    }else{
      if (that.data.applyState == '已申请'){
        wx.showToast({
          title: '您已申请该职位,去消息中心查看简历处理情况吧',
          icon:'none'
        })
      }else{
        wx.request({
          url: app.baseUrl +'apply/applyJob',
          method:'POST',
          header:app.header,
          data: { jobId: that.data.jobid},
          success:function(res){
            if(res.statusCode == 200){
              var obj = res.data;
              if(obj.code == 0){
                wx.showToast({
                  title: '申请成功,你可以在消息中心查看进度',
                  icon:'none'
                })
                setTimeout(
                  ()=>{
                    wx.navigateBack({
                      
                    })
                  },2000
                )
              }else{
                wx.showToast({
                  title: obj.msg,
                })
              }
            }else{
              wx.showToast({
                title: '网络异常,请重试',
              })
            }
          },
          complete:function(){
            wx.hideLoading();
          }
        })
      }
    }
  }
})