// pages/my/mySubClass/userInfoVC.js

var util = require('../../../utils/util.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pickerModeArr: ['date', 'selector', 'date', 'selector','region'],
    dataArr:[
      [{ title: '头像', detail: '/pages/images/other/account_icon_user.png', placehoderStr: ''}, 
        { title: '姓名', detail: '', placehoderStr: '请填写您的真实姓名' }, 
        { title: '性别', detail: '', placehoderStr: '选择您的性别' }],
      [{ title: '手机号码', detail: '', placehoderStr: '请填写您的联系方式' }, 
        { title: '邮箱', detail: '', placehoderStr: '请输入您的有效邮箱' }],
      [{ title: '出生日期', detail: '', placehoderStr: '',value:'1995-01-09' },
        { title: '学历', detail: '', placehoderStr: '选择您的学历',value:'4' },
        { title: '毕业时间', detail: '', placehoderStr: '',value:'2015-07-01' }, 
        { title: '工作年限', detail: '', placehoderStr: '' ,value:'1~3年'}, 
        { title: '现居地址', detail: '', placehoderStr: '',value:['安徽省','合肥市','蜀山区']}]
    ],
    sexArray: ['男', '女'],
    diplomaArr:['小学','初中','高中','大专','本科','硕士'],
    jobYearsArr:['1年以下','1~3年','3~5年','5年以上'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   var that = this;
   if (app.globalData.userInfo) {
     var userinfo = app.globalData.userInfo
     if (userinfo.avatarUrl) {
       var newdata = that.data.dataArr;
       newdata[0][0].detail = userinfo.avatarUrl
       that.setData({
         dataArr: newdata
       })
     }
   }
   wx.request({
     url: app.baseUrl + 'users/persionInfo',
     method:'POST',
     data:{type:0},
     header:app.header,
     success:function(res){
       if(res.statusCode == 200){
         var obj = res.data;
         if(obj.code == 0){
           if(obj.data){
             var newData = that.data.dataArr;
             for (var i = 0; i < newData.length; i++) {
               for (var j = 0; j < newData[i].length; j++) {
                 if(i==0 && j==0){
                   if (obj.data[i][j] == '/pages/images/other/account_icon_user.png' && app.globalData.userInfo.avatarUrl){
                     newData[i][j].detail = app.globalData.userInfo.avatarUrl
                   }else{
                     newData[i][j].detail = obj.data[i][j];
                   }
                 }else{
                   newData[i][j].detail = obj.data[i][j];
                 }
               }
             }
             that.setData({
               dataArr: newData
             })
           }
         }else{

         }
       }else{

       }
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
    var shareId = wx.getStorageSync("shareId");
    return {
      title: '上蜜蜂直聘,发现更多机会',
      path: '/pages/index/index?shareId=' + shareId,
      success: function (res) {
        console.log(res)
      }
    }
  },


  itemSelect:function(item){
    var index = item.currentTarget.id;
    // var section = index/10;
     var row = index%10;
    if (index <20){
      if (row === 0){
       // this.getIcomfunction();
      } else if (row === 1){
        
      }else{

      }
    } else if (index < 30){
      if (row === 0){

      } else {

      }
    }else{
      if (row === 0) {

      } else if (row === 1) {

      } else if (row === 2) {

      } else if (row === 3) {

      } else {

      }
    }
   
  },

  getIcomfunction: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      sourceType: ['album', 'camera'],
      success: function (res) {
        var newArr = that.data.dataArr;
        newArr[0][0].detail = res.tempFilePaths[0];
        that.setData({
          dataArr:newArr
        })
      },
    })
  },

  bindPickerSex: function (e) {
    var that = this;
    var newArr = that.data.dataArr;
    newArr[0][2].detail = that.data.sexArray[e.detail.value];
    that.setData({
      dataArr: newArr
    })
  },
  bindPickerChange: function (e) {
    var index = e.currentTarget.id;
    var that =this;
    var newArr = that.data.dataArr;
    if(index == 0){
      newArr[2][index].detail = e.detail.value;
    }else if(index==1){
      newArr[2][index].detail = that.data.diplomaArr[e.detail.value];
    } else if (index == 2) {
      newArr[2][index].detail = e.detail.value;
    } else if (index == 3) {
      newArr[2][index].detail = that.data.jobYearsArr[e.detail.value];
    } else {
      var address = '';
      for (var i = 0;i <e.detail.value.length;i ++ ){
        address += e.detail.value[i];
        address += i==2?'':'-'
      }
      newArr[2][index].detail = address;
    }
    that.setData({
      dataArr: newArr
    })
  },

  onEndInput(e){
    var newArr = this.data.dataArr;
    for (var i =0 ;i <newArr.length;i ++){
      var subArr = newArr[i];
      for (var j = 0; j <subArr.length; j++){
        if(subArr[j].title == e.detail.id){
          newArr[i][j].detail = e.detail.value;
          break;
        }
      }
    }
    this.setData({
      dataArr:newArr
    })
  },

  submitData:function(){
    var that = this;
    //.提交之前再做正则判断

    var alertTitle = '';
    if (!util.formatIsTrue(4,this.data.dataArr[1][1].detail)){
      alertTitle = '邮箱格式不正确';
    } else if (!util.formatIsTrue(3, this.data.dataArr[1][0].detail)){
      alertTitle = '手机号码格式不正确'
    }

    if (alertTitle.length >0){
      wx.showToast({
        title: alertTitle,
        icon:'none'
      })
      return;
    }

    //.提交信息
    
    //.首先上传图片
    var newArr = that.data.dataArr;
    var params = {
      iconUrl: newArr[0][0].detail,//'http://pic29.photophoto.cn/20131204/0034034499213463_b.jpg',
      nickName: newArr[0][1].detail,
      sex: newArr[0][2].detail,
      phoneNum: newArr[1][0].detail,
      email: newArr[1][1].detail,
      birthday: newArr[2][0].detail,
      education: newArr[2][1].detail,
      endEducationTime: newArr[2][2].detail,
      workYears: newArr[2][3].detail,
      address: newArr[2][4].detail,
    }

    // wx.showLoading({
    //   title: '加载中',
    // })
   wx.request({
     url: app.baseUrl +'users/persionInfo',
     method:'POST',
     data: params,
     header:app.header,
     success:function(res){
       if(res.statusCode == 200){
         if(res.data.code == 0){
           
             wx.showToast({
               title: '提交成功',
             })
           
           setTimeout(
             ()=>{
               wx.navigateBack({
                 
               })
             },1500
           )
         }else{
           
             wx.showToast({
               title: res.data.msg,
               icon: 'none'
             })
           
         }
       }else{
         
           wx.showToast({
             title: app.errorMsg,
             icon: 'none'
           })
         
         
       }
     },
     complete:function(){
      // wx.hideLoading()
     }
   })
  
  }
})

