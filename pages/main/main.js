// pages/main/main.js

 var util = require('../../utils/util.js')
 var app = getApp();

//114.102.146.43
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shareImg:'/pages/images/other/s_shareGray.png',
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
    jobId:'',
    companyName:'',
    companyDescribe:'',
    administratorId:'',
    phoneNum:'点击查看HR联系方式'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.jobID;
     var that = this;
    //  wx.showLoading({
    //    title: '加载中...',
    //  })
    //console.log(options);
     wx.request({
       url: app.baseUrl +'jobs/jobDetail',
       method:'POST',
       data: { jobId: id},
       header:app.header,
       success:function(res){
         if(res.statusCode == 200){
           var obj = res.data;
           console.log(obj);
           if(obj.code == 0 && obj.data){
            // console.log(obj.data)
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
               companyName: obj.data.companyName,
               administratorId: obj.data.administratorId,
               companyDescribe: obj.data.companyDescribe,
               jobId: obj.data.jobid
             })
           } else {
             wx.showToast({
               title: obj.msg,
               icon: 'none'
             })
             setTimeout(()=>{
               wx.navigateBack({
                 
               })
             },1000)
           }
         }else{
           wx.showToast({
             title: '网络异常,请重试',
             icon:'error'
           })
         }
       },
       complete:function(){
        // wx.hideLoading();
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

  shareFun:function(){
    this.onShareAppMessage;
  },

  getServerPhone:function(){
    var that = this;
    if (!app.isLogin()) {
      util.userLogin();
    } else if (that.data.applyState !='已申请'){
      wx.showToast({
        title: '投递简历,更容易获得工作机会哦~',
        icon:'none',
        duration:2000
      })
    }else {
      if (that.data.phoneNum =='点击查看HR联系方式'){
        wx.request({
          url: app.baseUrl + 'jobs/adminPhoneNum',
          method: 'POST',
          header: app.header,
          data: { administratorId: that.data.administratorId},
          success:function(res){
            console.log(res);
            if(res.statusCode == 200){
              var obj = res.data;
              console.log(obj);
              if(obj.code ==0 && obj.data){
                that.setData({
                  phoneNum: obj.data.phoneNum
                })
              }else{
                wx.showToast({
                  title: obj.msg,
                  icon: 'none'
                })
                setTimeout(()=>{
                  if (obj.code == -2 || obj.code == -1){//未完善基本信息
                    wx.navigateTo({
                      url: '../my/mySubClass/userInfoVC',
                    })
                  } else if (obj.code == -3) {//未完善教育信息
                    wx.navigateTo({
                      url: '../my/mySubClass/education',
                    })
                  } else if (obj.code == -4) {//未完善求职意向
                    wx.navigateTo({
                      url: '../my/mySubClass/jobIntention',
                    })
                  }
                },1500)
              }
            }else{
              wx.showToast({
                title: '网络异常',
                icon: 'none'
              })
            }
          },
          complete:function(err){

          }
          })
      }else{
        var that = this;
        wx.makePhoneCall({
          phoneNumber: that.data.phoneNum,
        })
      }
    }
  },
  
  formSubmit:function(e){
    console.log('form发生了submit事件，携带数据为：', e.detail.formId)  
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
        if (that.data.jobName.length == 0){
          return;
        }
        var params = {
          jobId: that.data.jobId,
          companyName: that.data.companyName,
          jobName: that.data.jobName,
          administratorId: that.data.administratorId,
          formId: e.detail.formId
        }
        wx.request({
          url: app.baseUrl +'apply/applyJob',
          method:'POST',
          header:app.header,
          data: params,
          success:function(res){
            if(res.statusCode == 200){
              var obj = res.data;
              if(obj.code == 0){
                wx.showToast({
                  title: obj.msg,
                  icon:'none',
                  duration:2500
                })
                setTimeout(
                  ()=>{
                    wx.navigateBack({
                      
                    })
                  },3000
                )
              }else{
                wx.showToast({
                  title: obj.msg,
                  icon: 'none'
                })
                setTimeout(() => {
                  if (obj.code == -2 ||obj.code == -1) {//未完善基本信息
                    wx.navigateTo({
                      url: '../my/mySubClass/userInfoVC',
                    })
                  } else if (obj.code == -3) {//未完善教育信息
                    wx.navigateTo({
                      url: '../my/mySubClass/education',
                    })
                  } else if (obj.code == -4) {//未完善求职意向
                    wx.navigateTo({
                      url: '../my/mySubClass/jobIntention',
                    })
                  }
                }, 1500)
              }
            }else{
              wx.showToast({
                title: '网络异常,请重试',
                icon: 'none'
              })
            }
          },
          complete:function(){
           // wx.hideLoading();
          }
        })
      }
    }
  }
})
