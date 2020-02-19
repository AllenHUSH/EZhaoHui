// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  await db.collection('t_url').doc(event.id).remove({
    success: function(res){
      return {
        data:{
          info:1,
          msg:"delete_success"
        }
      }
    },
    fail:function(res){
      return {
        data:{
          info:0,
          msg:"delete_fail"
        }
      }
    }
  })
}