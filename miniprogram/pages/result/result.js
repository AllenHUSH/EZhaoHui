// miniprogram/pages/result/result.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var arr = [
      "bg-red", "bg-orange", "bg-yellow",
      "bg-purple", "bg-olive", "bg-green", "bg-cyan", "bg-blue",
      "bg-brown"
    ];
    // var city=app.globalData.msgList;
    wx.cloud.callFunction({
      // 要调用的云函数名称
      name: 'queryUrl',
      // 传递给云函数的参数
      data: {
        type: "one",
        city: "长春市",
        company: "东师理想",
        edu_back:"本科 计算机类",
        province:"吉林省",
        info:"这是一条测试数据 薪资80/天 不包吃住 无转正"
      },
      success: res => {
        //将color属性加到数组的每一个对象的里面
        for (var i = 0; i < res.result.data.length; i++) {
          res.result.data[i].color = arr[Math.floor((Math.random() * arr.length))]
        }
        //  console.log(res.result.data);
        this.setData({
          result_content: res.result.data
        })
      },
      fail: err => {
        // handle error
        console.log(err);
      },
      complete: () => {
        // ...
      }
    })
  },
})