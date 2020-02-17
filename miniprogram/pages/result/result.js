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

    var arr = ["bg-red","bg-orange","bg-yellow",
    "bg-purple","bg-olive","bg-green","bg-cyan","bg-blue",
    "bg-brown"];
    wx.cloud.callFunction({
      // 要调用的云函数名称
      name: 'queryUrl',
      // 传递给云函数的参数
      data: {
        type:"city",
        city:"长春市",
        company:"东师理想"
      },
      success: res => {
        for(var i=0; i<res.result.data.length;i++){
          res.result.data[i].color=arr[Math.floor((Math.random()*arr.length))]
      }
      // console.log(res.result.data);
        this.setData({result_content:res.result.data})

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