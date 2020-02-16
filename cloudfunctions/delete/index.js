// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  db.collection('t_url').doc('b1c748a5-817e-40bb-b821-0831bc2f8899').remove({
    success:function(res){
      console.log(res.data)
    }
  })
}