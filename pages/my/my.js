// pages/my/my.js

var util = require('../../utils/util.js')
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
  userDescription: {placehouder:'请简短描述自己!',value:''},
   isDark: false,
   jobDescription: { placehouder: '请描述自己的工作经验', value: '' },
   dioDescription: { placehouder: '描述您的教育和学历', value: '' },
   CVDescription: { placehouder: '您还未创建简历', value: '' },
   icon:'/pages/images/other/account_icon_user.png',
   userInfo:{name:'',
             sex:'',
             diop:'',
             jobYears:'' },
   jobArr: [],
   diopArr: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if (app.globalData.userInfo){
      var userinfo = app.globalData.userInfo
      if (userinfo.avatarUrl){
        that.setData({
          icon: userinfo.avatarUrl
        })
      }
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  onSuccess:function(res){
    console.log(res.data);
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
    
    this.getNetData();
    setTimeout(function () {
      wx.stopPullDownRefresh()
    }, 1000
    )
  },
  

  getNetData:function(){
    if (!app.isLogin()){
      return;
    }
    var that = this;
    wx.showLoading({
      title: '加载中',
    });
    //.获取接口参数
    wx.request({
      url: app.baseUrl + 'users/getUserInfo',
      method: 'GET',
      header: app.header,
      success: function (res) {
        var obj = res.data;
        if (obj.code == 0) {
          if (obj.data){
            var userDescription_ = 'userDescription.value';
            var userDic = that.data.userInfo;
            userDic.name = obj.data.name;
            userDic.sex = obj.data.sex;
            userDic.diop = obj.data.education;
            userDic.jobYears = obj.data.workYears;
            that.setData({
              diopArr: obj.data.educationList,
              jobArr: obj.data.workExperienceList,
              [userDescription_]: obj.data.workIntention,
              userInfo: userDic,
              // icon: obj.data.iconUrl
            })
          }
        } else {
          setTimeout(function(){
            wx.showToast({
              title: obj.msg,
              icon: 'none'
            })
          },1500)
        }
      },
      complete: function () {
        wx.hideLoading();
      }
    })
  },


  //自定义函数
  pushUserInfo:function(){
   
    if (!app.isLogin()){
      util.userLogin();
    }else{
      wx.navigateTo({
        url: './mySubClass/userInfoVC',
      })
    } 
  },

  pushJobIntentionVC: function (){
    if (!app.isLogin()) {
      util.userLogin();
    } else {
      wx.navigateTo({
        url: './mySubClass/jobIntention',
      })
    } 
    
  },

  pushWorkExperience: function (){
    if (!app.isLogin()) {
      util.userLogin();
    } else {
      wx.navigateTo({
        url: './mySubClass/workExperience',
      })
    } 
    
  },
  pushWorkEducation: function (index){
    if (!app.isLogin()) {
      util.userLogin();
    } else {
      var iden = index.currentTarget.id;
      wx.navigateTo({
        url: './mySubClass/education?id=' +iden,
      })
    } 
    
  },
  /*工作经历列表*/
  pushWorkList: function (){
    var that = this;
    if (!app.isLogin()) {
      util.userLogin();
    } else {
      wx.navigateTo({
        url: './mySubClass/workList',
      })
    } 
    
  },

  pushHelp:function(){
    wx.navigateTo({
      url: './mySubClass/helpAndSetting',
    })
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
    return{
      title:'小程序测试转发',
      path:'/pages/app',
      success:function(res){
        console.log(res)
      }
    }
  }
})