// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database().collection('t_url')

// 云函数入口函数
exports.main = async (event, context) => {
  
  //获取当前时间
  let n = new Date()
  let nowTime = n.getTime()

  // 获取所有的 t_url 数据
  const t_url = await db.get()

  //获取data 内容
  const data = t_url["data"]

  //遍历 data
  for(var i in data){
    let time = data[i]["end_time"].getTime()
    if ((time - nowTime)<0){
      //return data[i]["end_time"]
      await db.doc(data[i]["_id"]).update({
        data:{
          state: 3
        }
      })
    }
  }

}