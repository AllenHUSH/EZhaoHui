// miniprogram/pages/about/about.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    condition: 0,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  // 点击go向后端传参

  bindtest: function () {

    wx.request({

      url: '', //本地服务器地址

      data: {

        

      },

      method: 'GET',

      header: {

        'content-type': 'application/json' //默认值

      },

      success: function (res) {

        console.log(res);

      },

      fail: function (res) {

        console.log("失败");

      }

    })

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var condition=this.condition;
    // 查看是否授权
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          condition = 1;
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
             
              console.log(condition);
              //console.log(res.userInfo)
            }
          })
        }
      }
    });
    
  },
  bindGetUserInfo(e) {
    console.log(e.detail.userInfo);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
   
})