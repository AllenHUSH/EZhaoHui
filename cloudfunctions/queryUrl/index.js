// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  if(event.type == 'all'){
    return await db.collection('t_url').get()
  }else if(event.type == 'city'){ 
    return await db.collection('t_url').where({
      city: event.city
    }).get({
      success: function (res) {
        return res.data
      }
    })
  } else if (event.type == 'state') {
    return await db.collection('t_url').where({
      state: event.state
    }).get({
      success: function (res) {
        return res.data
      }
    })
  }
  else if(event.type == 'province'){
    return await db.collection('t_url').where({
      province: event.province
    }).get({
      success: function (res) {
        return res.data
      }
    })
  }else if(event.type == 'company'){
    return await db.collection('t_url').where({
      company: {
        $regex: '.*' + event.company + '.*',
        $options: 'i'
      }
    }).get({
      success: function (res) {
        return res.data
      }
    })
  }else if(event.type == 'edu_back'){
    return await db.collection('t_url').where({
      edu_back: {
        $regex: '.*' + event.edu_back + '.*',
        $option: 'i'
      }
    }).get({
      success: function (res) {
        return res.data
      }
    })
  } else if (event.type == 'title') {
    return await db.collection('t_url').where({
      title: {
        $regex: '.*' + event.title + '.*',
        $option: 'i'
      }
    }).get({
      success: function (res) {
        return res.data
      }
    })
  } else if (event.type == 'cityandeduback') {
    return await db.collection('t_url').where({
      edu_back: {
        $regex: '.*' + event.edu_back + '.*',
        $option: 'i'
      },
      city: event.city
    }).get({
      success: function (res) {
        return res.data
      }
    })
  } else if (event.type == 'provinceandeduback') {
    return await db.collection('t_url').where({
      edu_back: {
        $regex: '.*' + event.edu_back + '.*',
        $option: 'i'
      },
      province: event.province
    }).get({
      success: function (res) {
        return res.data
      }
    })
  } else if (event.type == 'provinceandtitle') {
    return await db.collection('t_url').where({
      title: {
        $regex: '.*' + event.title + '.*',
        $option: 'i'
      },
      province: event.province
    }).get({
      success: function (res) {
        return res.data
      }
    })
  } else if (event.type == 'cityandtitle') {
    return await db.collection('t_url').where({
      title: {
        $regex: '.*' + event.title + '.*',
        $option: 'i'
      },
      city: event.city
    }).get({
      success: function (res) {
        return res.data
      }
    })
  } else if (event.type == "allSerch") {
    return await db.collection("t_url").where({
      info: event.info,
      province: event.provincn,
      city:event.city,
      company:event.company,
      edu_back:event.edu_back,
    }).get({
      success: function(res){
        return res.data
      },
      error: function(res){
        return "数据不全"
      }
    })
  }else if (event.type == "one"){
    if(event.salary==0){
    return await db.collection('t_url').where(db.command.and([{
      city: db.RegExp({
        regexp: '.*' + event.city+'.*',
        options: 'i',
      })
    },
    {
      company: db.RegExp({
        regexp: '.*' + event.company + '.*',
        options: 'i',
      })
    },
    {
      edu_back: db.RegExp({
        regexp: '.*' + event.edu_back + '.*',
        options: 'i',
      })
    },
    {
      salary: db.RegExp
    },
    {
      province: db.RegExp({
        regexp: '.*' + event.province + '.*',
        options: 'i',
      })
    },
    {
      title: db.RegExp({
        regexp: '.*' + event.title + '.*',
        options: 'i',
      })
    },
    {
      state: event.state
    },
      // {
      //   title: db.RegExp({
      //     regexp: '.*' + event.title,
      //     options: 'i',
      //   })
      // }
    ])).get()}
    else{
      return await db.collection('t_url').where(db.command.and([{
        city: db.RegExp({
          regexp: '.*' + event.city + '.*',
          options: 'i',
        })
      },
      {
        company: db.RegExp({
          regexp: '.*' + event.company + '.*',
          options: 'i',
        })
      },
      {
        edu_back: db.RegExp({
          regexp: '.*' + event.edu_back + '.*',
          options: 'i',
        })
      },
      {
        province: db.RegExp({
          regexp: '.*' + event.province + '.*',
          options: 'i',
        })
      },
      {
        title: db.RegExp({
          regexp: '.*' + event.title + '.*',
          options: 'i',
        })
      },
      {
        state: event.state
      }])).get()
    }
  }else if(event.type == "two"){
    return await db.collection("t_url").where({
      state: event.state,
    }).get({
      success: function (res) {
        // res.data 是包含以上定义的两条记录的数组
        console.log(res.data)
      }
    });
  }
}