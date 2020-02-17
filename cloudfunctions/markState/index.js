// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  if(event.toState == 1){
    db.collection("t_url").doc(event._id)
      .update({
        data: {
          state: event.state,
        },
      })
  }else if(event.toState == 2){
    db.collection("t_url").doc(event._id)
      .update({
        data: {
          state: event.state,
        },
      })
  }
  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}