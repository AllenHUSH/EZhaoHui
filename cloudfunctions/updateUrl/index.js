// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  if(event.id == null|| event.id.leng == 0){
    return {
      data: {
        info: 0,
        msg: "id_empty"
      }
    }
  }
  await db.collection('t_url').doc(event.id).update({
      data:{
        city: event.city,
        company: event.company,
        create_time: new Date(JSON.parse(event.create_time)),
        salary: event.salary,
        menbers: event.menbers,
        edu_back: event.edu_back,
        end_time: new Date(JSON.parse(event.end_time)),
        info: event.info,
        picture: event.picture,
        province: event.province,
        state: event.state,
        title: event.title,
        url: event.url,
        username: event.username,
      },
    success: function (res) {
      return {
        info: 1,
        msg: "update_success"
      }
    },
    fail: function (res) {
      return {
        data: {
          info: 0,
          msg: "update_fail"
        }
      }
    }
  })
  return {
    msg: 'ok'
  }
}