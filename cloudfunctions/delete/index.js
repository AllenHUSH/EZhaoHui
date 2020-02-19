// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  db.collection('t_url').doc('4278fc3a5e4ba20900625e8c1eb6f5c8').remove({
    success:function(res){
      console.log(res.data)
    }
  })
}