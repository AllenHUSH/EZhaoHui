// miniprogram/pages/about/about.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    identity: "user",
    d: true,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    urlContent:"",
    orignContent: "分享你的咨询链接",//value值
    username:"",
    openid:""
  },


  //监听输入的url
  urlInp: function(e){
    this.data.urlContent = e.detail.value;
  },
  // 点击go向后端传参
  bindtest: function() {
    if(this.data.urlContent!=''){
      wx.cloud.callFunction({
        //云函数名称
        name: "insertUrl",
        //传递的参数
        data: {
          target_url: this.data.urlContent,
          username: this.data.openid,
        }
      }).then(res => {
        console.log(res);
        if(res.result!=null){
          wx.showModal({
            title: '提示',
            content: '已有此条咨询，发送失败',
            success(res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
        else{
          wx.showToast({
            title: '传送成功',
            icon: 'success',
            duration: 2000
          });
        }
      })
        .catch(console.error);
      //将input中的内容还原
      this.setData({
        orignContent: "分享你的咨询链接",
        urlContent: ""
      });
    // console.log(this.data.orignContent);
    // console.log(this.data.urlContent);
    }
    else{
      wx.showModal({
        title: '提示',
        content: '传送的咨询不能为空',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this;
    //查看是否授权
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function(res) {
              _this.setData({
                username: res.userInfo.nickName,
                condition: false
              });
            }
          })
        }
      }
    });
    //获取用户openid
    this.getOpenid();
  },
  //获取用户openid，并判断是否为管理员的openid
  getOpenid() {
    wx.cloud.callFunction({
      name: 'getOpenid',
      complete: res => {
        // console.log('云函数获取到的openid: ', res.result.openId)
        let openid = res.result.openId;
        this.setData({
          openid: openid
        })
        //将得到的openid传给后端进行判断
        wx.cloud.callFunction({
          //云函数名称
          name: "queryAuthority",
          //传递的参数
          data: {
            user_openid: this.data.openid,
          }
        }).then(res => {
          this.setData({
            identity: res.result
          })
        }).catch(console.error);
      }
    });
  },
  // 长按头像复制openID
  copyOpenid(){
    wx.setClipboardData({
      data: this.data.openid,
      // success: function (res) {
      //   wx.showModal({
      //     title: '提示',
      //     content: '复制成功',
      //     showCancel: false
      //   });
      // }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
  },
  //得到用户信息
  bindGetUserInfo(e) {
    console.log(e.detail.userInfo);
  },
  
 
   
})