// pages/my/mySubClass/workExperience.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   styData:[
     {title:'公司',placehoderStr:'必填',pickDataArr:[]},
     { title: '职位', placehoderStr: '必填', pickDataArr: [] },
     { title: '开始时间', placehoderStr: '必选', pickDataArr:[] },
     { title: '结束时间', placehoderStr: '必选', pickDataArr: [] }
   ],
   valueArr:['','','',''],
   inputTextNum:0,
   inputValue:''
  },

  startDataArr:function(){
    var dataA = [];
    var monthArr = [];
    for (var i = 1980 ; i <2018 ; i ++){
      dataA.push(i+'年');
    }
    for (var j =1 ; j <=12; j ++){
      monthArr.push(j+'月');
    }
    return [dataA, monthArr];
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id);
    var that = this;
    var newData = this.data.styData;
    newData[2].pickDataArr = this.startDataArr();
    newData[3].pickDataArr = this.startDataArr();
    this.setData({
      styData:newData
    })

    wx.getStorage({
      key: 'workExperience',
      success: function(res) {
        if(res.data.arr.length > 0){
          that.setData({
            valueArr:res.data.arr,
            inputValue: res.data.detail
          })
        }
      },
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

  bindPicker:function(e){
    var that = this;
   var index = e.currentTarget.id;
   var newDataArr = that.data.valueArr;
   var pickDataArr = this.startDataArr();
   newDataArr[index] = pickDataArr[0][e.detail.value[0]] + pickDataArr[1][e.detail.value[1]];
   that.setData({
     valueArr:newDataArr
   })
  },
  onEndInput(e){
    var that = this;
    var newValueArr = that.data.valueArr;
    if(e.detail.id == '公司'){
      newValueArr[0] = e.detail.value;
    }else{
      newValueArr[1] = e.detail.value;
    }
    that.setData({
      valueArr:newValueArr
    })

  },

  editTextArea:function(e){
    var that = this;
    that.setData({
      inputTextNum:e.detail.cursor
    })
  },

  endEditArea:function(e){
    
    var that = this;
    that.setData({
      inputValue:e.detail.value
    })
  },

  submitData:function(){
    var alertStr = '';
    var stratTime = this.data.valueArr[2];
    var endTime = this.data.valueArr[3];
    stratTime = stratTime.replace("年","");
    stratTime = stratTime.replace("月", "");
    endTime = endTime.replace("年", "");
    endTime = endTime.replace("月", "");
    if (this.data.valueArr[0].length == 0){
      alertStr = '公司名称不能为空'
    } else if (this.data.valueArr[1].length == 0){
      alertStr = '职位不能为空'
    } else if (this.data.valueArr[2].length == 0) {
      alertStr = '开始时间不能为空'
    } else if (this.data.valueArr[3].length == 0) {
      alertStr = '结束时间不能为空'
    } else if (parseInt(stratTime) > parseInt(endTime)){
      alertStr = '开始时间不能早于结束时间'
    }else if(this.data.inputValue.length == 0){
      alertStr = '工作内容不能为空'
    }

    if(alertStr.length > 0){
      wx.showToast({
        title: alertStr,
        icon:'none'
      })
      return;
    }

    //.提交
    var data_ = {
      arr: this.data.valueArr,
      detail: this.data.inputValue
    }

    wx.setStorage({
      key: 'workExperience',
      data: data_,
      success:function(){
        wx.showToast({
          title: '提交成功',
        })
        setTimeout(
          ()=>{
            wx.navigateBack({
              
            })
          },1000
        )
      }
    })
  },
})