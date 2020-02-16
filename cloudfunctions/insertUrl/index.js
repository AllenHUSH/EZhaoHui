// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  db.collection('t_url').add({
    data:{
      url: event.target_url,
      state: 0,
      username: event.username
    },
    success: function (res) {
      return {
        info: ok
      }
    }
  })
}