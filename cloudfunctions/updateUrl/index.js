// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  db.collection('t_url').doc(event.id).update({
      data:{
        url: event.target_url,
        city: event.city,
        company: event.company,
        creat_time: db.serverDate(),
        edu_back: event.edu_back,
        end_time: event.end_time,
        info: event.info,
        province: event.province,
        state: event.state,
        title: event.title,
        url: event.url,
        username: event.username
      }
  })
  return {
    msg: 'ok'
  }
}