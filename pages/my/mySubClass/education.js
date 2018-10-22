// pages/my/mySubClass/education.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    defDataArr: [{ title: '开始时间', pickerDataArr: [], pickerMode: 'multiSelector', value: ['10', '8']},
      { title: '结束时间', pickerDataArr: [], pickerMode: 'multiSelector',value:['11','6'] },
          { title: '学校', pickerDataArr: [], pickerMode: '' },
          { title: '专业', pickerDataArr: [], pickerMode: '' },
          { title: '学历', pickerDataArr: ['小学', '初中', '高中', '大专', '本科', '硕士'], pickerMode: 'selector' }],
    
    valueArr:['','','','',''],
    educationId:'',
    subMitIsEnable:true
  },


  startDataArr: function () {
    var dataA = [];
    var monthArr = [];
    for (var i = 2008; i < 2022; i++) {
      dataA.push(i + '年');
    }
    for (var j = 1; j <= 12; j++) {
      monthArr.push(j + '月');
    }
    return [dataA, monthArr];
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var newData = this.data.defDataArr;
    newData[0].pickerDataArr = this.startDataArr();
    newData[1].pickerDataArr = this.startDataArr();
    this.setData({
      defDataArr: newData
    })
    
    if(options.id && options.id.length > 0){
      that.getNetData({ type: 0,'educationId':options.id});
      that.setData({
        educationId:options.id
      })
    }
  },

  getNetData:function(params){
    var that = this;
    // wx.showLoading({
    //   title: '加载中...',
    // })
    that.setData({
      subMitIsEnable:false
    })
    wx.request({
      url: app.baseUrl +'users/education',
      method:'POST',
      header:app.header,
      data:params,
      success:function(res){
        if(res.statusCode == 200){
          var obj = res.data;
          if(obj.code == 0){
            if(params.type == 0){
             if(obj.data){
               //.获取信息
               var newDataArr = [obj.data.startTime,
               obj.data.endTime,
               obj.data.school,
               obj.data.specialize,
               obj.data.diploma]
               that.setData({
                 valueArr: newDataArr,
                 educationId: obj.data.educationId
               })
             }
            }else{
              wx.showToast({
                title: '提交成功',
              })
              setTimeout(
                () => {
                  wx.navigateBack({

                  })
                }, 1500
              )
            }
          }else{
            wx.showToast({
              title: obj.msg,
              icon:'none'
            })
          }
        }else{
          wx.showToast({
            title: app.errorMsg,
            icon:'none'
          })
        }
      },
      complete:function(){
      //  wx.hideLoading()
        that.setData({
          subMitIsEnable: true
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
    var shareId = app.shareOrAdmin_ID();
    return {
      title: '上蜜蜂直聘,发现更多机会',
      path: '/pages/index/index?shareId=' + shareId,
      success: function (res) {
        console.log(res)
      }
    }
  },

  bindPicker: function (e) {
    var that = this;
    var index = e.currentTarget.id;
    var newDataArr = that.data.valueArr;
    if(index ==4){
      newDataArr[index] = that.data.defDataArr[index].pickerDataArr[e.detail.value];
    }else{
      var pickDataArr = this.startDataArr();
      newDataArr[index] = pickDataArr[0][e.detail.value[0]] + pickDataArr[1][e.detail.value[1]];
    }
    that.setData({
      valueArr: newDataArr
    })
  },

  onEndInput:function(e){
    var that = this;
    var newDataArr = that.data.valueArr;
    if(e.detail.id == '学校'){
      newDataArr[2] =e.detail.value;
    }else{
      newDataArr[3] = e.detail.value;
    }
    that.setData({
      valueArr: newDataArr
    })
  },
 
  submitData:function(){
    var that = this;
    if (!that.data.subMitIsEnable) {
      return;
    }
    var params = {
      startTime:that.data.valueArr[0],
      endTime: that.data.valueArr[1],
      school: that.data.valueArr[2],
      specialize: that.data.valueArr[3],
      diploma: that.data.valueArr[4],
      educationId:that.data.educationId
    }
    that.getNetData(params);
  }


})