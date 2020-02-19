// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  const data = await db.collection('t_url').where({
    url: event.url
  }).get()

  //查重 是否相同 url
  if ((data.data.length != 0)) {
    return {
      data: {
        info: 0,
        msg: "url_same"
      }
    }
  }

  // 不能为空 的值
  if(event.title == null || event.title.length == 0){
    return {
      data:{
        info:0,
        msg:"title_empty"
      }
    }
  }
  else if (event.username == null) {
    return {
      data: {
        info: 0,
        msg: "userName_empty"
      }
    }
  }
  else if (event.url == null) {
    return {
      data: {
        info: 0,
        msg: "url_empty"
      }
    }
  } else if (event.city == null) {
    return {
      data: {
        info: 0,
        msg: "city_empty"
      }
    }
  } else if (event.menbers == null) {
    return {
      data: {
        info: 0,
        msg: "menbers_empty"
      }
    }
  }
  else if (event.salary == null) {
    return {
      data: {
        info: 0,
        msg: "salary_empty"
      }
    }
  }
  else if (event.edu_back == null) {
    return {
      data: {
        info: 0,
        msg: 'edu_back_empty'
      }
    }
  } else if (event.province == null) {
    return {
      data: {
        info: 0,
        msg: 'province_empty'
      }
    }
  } else if (event.end_time == null || event.end_time.length == 0) {
    return {
      data: {
        info: 0,
        msg: 'create_end_time_empty'
      }
    }
  }

  await db.collection('t_url').add({
    data: {
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
      state: 0,
      title: event.title,
      url: event.url,
      username: event.username,
    },
    success: function (res) {
      return {
        info: 1,
        msg: "insert_success"
      }
    },
    fail: function (res) {
      return {
        data: {
          info: 0,
          msg: "insert_fail"
        }
      }
    }
  })
}