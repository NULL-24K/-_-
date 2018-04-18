// pages/my/mySubClass/jobIntention.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    styData:[
      { title: '期望工作地', pickMode:'region',placehoderStr:'请选择期望工作地址',pickValueArr:[]},
      { title: '期望行业',pickMode: 'selector', placehoderStr: '请选择期望行业', pickValueArr: ['IT/通信/电子/互联网', '餐饮/酒店/旅游', '房地产/建筑', '服务业', '交通/运输/物流', '教育', '金融', '贸易/批发/零售/租赁', '能源/矿产/环保', '农/林/牧/渔', '商业服务', '生产/加工/制造', '文化/传媒/娱乐/体育', '医疗/卫生/保健', '政府/公共事业', '其他'] },
      { title: '期望职位', pickMode: 'selector', placehoderStr: '请选择职位', pickValueArr: ['IT', '客服', '催收', '外派'] },
      { title: '期望薪资', pickMode: 'selector', placehoderStr: '请选择期望薪资', pickValueArr: ['1000~3000', '3001~5000', '5001~8000', '8000~12000', '12000~20000', '20000以上'] },
      { title: '求职状态', pickMode: 'selector', placehoderStr: '选择您当前求职状态', pickValueArr: ['正在找工作-随时到岗', '在职-正在考虑换工作', '在职-考虑更好的工作机会', '在职-暂无跳槽意向'] }
    ],
    jonStatus:0,
    valueArr:['','','','','']

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.showLoading({
      title: '正在加载',
    })
    wx.request({
      url: app.baseUrl + 'users/jobIntention',
      method:'POST',
      header:app.header,
      data:{type:0},
      success:function(res){
        if(res.statusCode == 200){
          var obj = res.data;
          if(obj.code == 0){
            if(obj.data){
              var newArr = [];
              console.log(obj.data)
              newArr.push(obj.data.intentionAddress);
              newArr.push(obj.data.intentionIndustry);
              newArr.push(obj.data.intentionPosition);
              newArr.push(obj.data.intentionSalary);
              newArr.push(obj.data.jobState);
              that.setData({
                valueArr: newArr
              })
            }
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
    var selectIndex = e.currentTarget.id;
    var newValueArr = that.data.valueArr;
    if (selectIndex == 0){
      var address = '';
      for (var i = 0; i < e.detail.value.length;i ++ ){
        address += e.detail.value[i];
        address += i==2?'':'-'
      }
      newValueArr[selectIndex] = address;
    }else{
      newValueArr[selectIndex] = that.data.styData[selectIndex].pickValueArr[e.detail.value];
      if(selectIndex == 4){
        that.setData({
          jonStatus:e.detail.value
        })
      }
    }
    that.setData({
      valueArr:newValueArr
    })
  },

  submitData:function(){
    var that = this;
    if (that.data.valueArr[0].length == 0){
      wx.showToast({
        title: '期望工作地点不能为空',
        icon:"none",
        duration:1500
      })
      return;
    }

    var params = {
      'intentionAddress': that.data.valueArr[0],
      'intentionIndustry': that.data.valueArr[1],
      'intentionPosition': that.data.valueArr[2],
      'intentionSalary': that.data.valueArr[3],
      'jobState': that.data.jonStatus
    }
    wx.showLoading({
      title: '加载中',
    })
    console.log(params)
    wx.request({
      url: app.baseUrl + 'users/jobIntention',
      method:'POST',
      header:app.header,
      data: params,
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
        wx.hideLoading();
      }
    })
  },
})