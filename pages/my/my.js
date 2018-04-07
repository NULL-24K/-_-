// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userObj:{
      
    },
    userDescription: {placehouder:'请简短描述自己!',value:''},
   isDark: false,
   jobDescription: { placehouder: '请描述自己的工作经验', value: '' },
   dioDescription: { placehouder: '描述您的教育和学历', value: '' },
   CVDescription: { placehouder: '您还未创建简历', value: '' },
   icon:'/pages/images/other/account_icon_user.png',
   userInfo:{name:'NULL',
             sex:'男',
             diop:'本科',
             jobYears:'4~5年' },
   jobArr: [{ title: '工作一', detail: '描述' }, { title: '工作一', detail: '描述' }],
   diopArr: [{ title: '工作一', detail: '描述' }]
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
    var that = this;
  //.获取缓存数据
  wx.getStorage({
    key: 'jobIntention',
    success: function(res) {
      if(res.data.length>2){
        var userDes = that.data.userDescription;
        userDes.value = res.data[2]
        that.setData({
          userDescription: userDes
        })    
      }
    },
  }),
    wx.getStorage({
      key: 'userInfo_key',
      success: function (res) {
        if (res.data.length > 2) {
          var userDes = {
            name: res.data[0][1].detail,
            sex: res.data[0][2].detail,
            diop: res.data[2][1].detail,
            jobYears: res.data[2][3].detail
          }
          
          that.setData({
            userInfo: userDes,
            icon: res.data[0][0].detail
          })
        }
      },
    })
 
    wx.startPullDownRefresh();
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
    wx.showLoading({
      title: '加载中',
    });
   wx.stopPullDownRefresh();

   //.这里添加获取参数的代码
   setTimeout(
     ()=>{
       wx.hideLoading();
     },500
   )


  },


  //自定义函数
  pushUserInfo:()=>{
    wx.navigateTo({
      url: './mySubClass/userInfoVC',
    })
  },

  pushJobIntentionVC:()=>{
    wx.navigateTo({
      url: './mySubClass/jobIntention',
    })
  },

  pushWorkExperience:()=>{
    wx.navigateTo({
      url: './mySubClass/workExperience',
    })
  },
  pushWorkEducation:()=>{
    wx.navigateTo({
      url: './mySubClass/education',
    })
  },
  /*工作经历列表*/
  pushWorkList:()=>{
    wx.navigateTo({
      url: './mySubClass/workList',
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
  
  }
})