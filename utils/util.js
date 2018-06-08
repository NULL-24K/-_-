const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const userLogin = ()=>{
  wx.navigateTo({
    url: '../loginAndregister/login',
  })
}
/**正则判断 
 * type:类型 0:是否带有小数 1:校验是否中文名称组成 2:校验是否全由8位数字组成 3:校验电话码格式 4:校验邮件地址是否合法
 * str:内容*/
const formatIsTrue = (formatType,str)=>{
  if (formatType ==0){
    var objRegExp = /^\d+\.\d+$/;
    return objRegExp.test(strValue);
  }else if(formatType == 1){
    var reg = /^[\u4E00-\u9FA5]{2,4}$/;   /*定义验证表达式*/
    return reg.test(str);     /*进行验证*/
  } else if (formatType == 2) {
    var reg = /^[0-9]{8}$/;   /*定义验证表达式*/
    return reg.test(str);     /*进行验证*/
  } else if (formatType == 3) {
    var reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
    return reg.test(str);
  } else if (formatType == 4) {
    var reg = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
    return reg.test(str);
  }
}

module.exports = {
  formatTime: formatTime,
  userLogin: userLogin,
  formatIsTrue: formatIsTrue
}
 