// pages/my/mySubClass/education.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    defDataArr: [{ title: '开始时间', pickerDataArr: [], pickerMode:'multiSelector'},
      { title: '结束时间', pickerDataArr: [], pickerMode: 'multiSelector' },
          { title: '学校', pickerDataArr: [], pickerMode: '' },
          { title: '专业', pickerDataArr: [], pickerMode: '' },
          { title: '学历', pickerDataArr: ['小学', '初中', '高中', '大专', '本科', '硕士'], pickerMode: 'selector' }],
    
    valueArr:['','','','','']
  },


  startDataArr: function () {
    var dataA = [];
    var monthArr = [];
    for (var i = 1980; i < 2018; i++) {
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
})