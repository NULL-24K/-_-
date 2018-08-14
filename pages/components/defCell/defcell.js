// pages/components/defCell/defcell.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imagesrc:{
      type:String,
      value:'../../images/main_def.jpg'
    },
    title:{
      type:String,
      value:'默认文字'
    },
    detailTitle:{
      type:String,
      value:'上海盛大网络'
    },
    location:{
      type:String,
      value:'浦东新区'
    },
    diploma: {
      type: String,
      value: '本科'
    },
    years: {
      type: String,
      value: '五年以上'
    },
    salary: {
      type: String,
      value: '3万-5万'
    },
    applyNum: {
      type: String,
      value: '888人申请'
    },
    statusTag:{
      type:String,
      value:''
    },
    tagImg:{
      type:String
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

  }
})
