// pages/components/defCell/messageDetailCell.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    lineCol:{
      type:String,
      value:'green'
    },//RI_h?dpQ+8si   
    isSuccess:{
      type:Boolean,
      value:true
    },
    timeStr:{
      type:String,
    },
    status:{
      type:String,
    },
    detail:{
      type:String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    invalidimg:'../../images/other/attestation_invalid.png',
    successimg: '../../images/other/attestation_success.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
