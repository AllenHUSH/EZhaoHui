// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  return await db.collection("t_url").where({
   state:event.state,
  }).get({
    success: function (res) {
      // res.data 是包含以上定义的两条记录的数组
      console.log(res.data)
    }
  });
  return {
    data:cool.data,
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}