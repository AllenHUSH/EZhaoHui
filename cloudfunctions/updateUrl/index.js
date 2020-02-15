// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  if(event.target_url!=null){
    db.collection('t_url').doc(event.id).update({
      data:{
        url: event.target_url
      }
    })
  }else{
  db.collection('t_url').doc(event.id).update({
      data:{
        state: event.state
      }
    })
  }
  return {
    msg: 'ok'
  }
}