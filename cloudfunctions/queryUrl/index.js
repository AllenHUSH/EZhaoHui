// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  if(event.type == 'all'){
    return db.collection('t_url').get()
  }else if(event.type == 'city'){
     db.collection('t_url').where({
      city: event.city
    }).get({
      success: function (res) {
        return res.data
      }
    })
  } else if (event.type == 'state') {
    db.collection('t_url').where({
      state: event.state
    }).get({
      success: function (res) {
        return res.data
      }
    })
  }
  else if(event.type == 'province'){
    db.collection('t_url').where({
      province: event.province
    }).get({
      success: function (res) {
        return res.data
      }
    })
  }else if(event.type == 'company'){
    db.collection('t_url').where({
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
    db.collection('t_url').where({
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
    db.collection('t_url').where({
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
    db.collection('t_url').where({
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
    db.collection('t_url').where({
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
    db.collection('t_url').where({
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
    db.collection('t_url').where({
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
  }
  
}