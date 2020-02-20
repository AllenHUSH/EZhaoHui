// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  
  // return event.id

// 获取 t_recommend 的 _id 
  const data = await  db.collection('t_recommend').where({
    url_id: event.id
  }).get()
  
  const recommend_id = data["data"][0]["_id"]
  
  // return recommend_id

  const flag = 0

  await db.collection('t_url').doc(event.id).remove({
    fail:function(res){
      flag += 1
    }
  })


  await db.collection('t_recommend').doc(recommend_id).remove({
    fail:function(res){
      flag += 2
    }
  })

  if(flag==0){
    return {
      data: {
        info: 1,
        msg: "delete_success"
      }
    }
  }else if(flag==1){
    return {
      data: {
        info: 0,
        msg: "delete_url_fail"
      }
    }
  }else if(falg==2){
    return {
      data: {
        info: 0,
        msg: "delete_recommend_fail"
      }
    }
  }else if(flag==3){
    return {
      data:{
        info:0,
        msg:"delete_fail"
      }
    }
  }


}