// pages/components/defCell/userInfoCell.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:{
      type:String,
      value:''
    },
    detail: {
      type: String,
      value: ''
    },
    arrowImg: {
      type: String,
      value: '/pages/images/other/home_button_right.png'
    },
    placeholderStr:{
      type:String,
    },
    detailIsImg:{
      type:Boolean,
      value:false
    },
    isDisabled:{
      type:Boolean,
      value:true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    _endInput:function(e){ 
      var idStr = e.currentTarget.id;
      this.triggerEvent('endInput',{id:idStr,value:e.detail.value})
    },
  }
})
