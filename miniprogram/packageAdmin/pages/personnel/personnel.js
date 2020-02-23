// packageAdmin/pages/personnel/personnel.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    openid:"",
    identity:"admin",
    adminList: []
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  addAdmin: function(e) {
    let name = e.detail.value.nickname;
    let openid = e.detail.value.user_openid;
    if (name == "") {
      wx.showToast({
        title: '请填写昵称',
        icon: 'none',
        duration: 2000
      })
    } else if (openid == "") {
      wx.showToast({
        title: '请填写OpenID',
        icon: 'none',
        duration: 2000
      })
    } else {
      wx.cloud.callFunction({
        name: 'insertAdmin',
        data: {
          nickname: name,
          user_openid: openid
        },
        success: () => {
          this.queryAdmin();
          wx.showToast({
            title: '添加成功',
            duration: 2000
          })
        },
        fail: () => {
          wx.showToast({
            title: '添加失败',
            icon: 'none',
            duration: 2000
          })
        },
        complete: () => {
          this.setData({
            modalName: null
          })
        }
      })
    }

  },
  deleteAdmin: function(e) {
    let openid = e.target.dataset.openid;
    wx.cloud.callFunction({
      name: 'deleteAdmin',
      data: {
        user_openid: openid
      },
      success: (res) => {
        console.log(res);
        this.queryAdmin();
        wx.showToast({
          title: '删除成功',
          duration: 2000
        })
      }
    })
  },
  queryAdmin: function() {
    wx.cloud.callFunction({
      name: 'queryAdmin',
      success: res => {
        this.setData({
          adminList: res.result.data
        });
      },
      fail: err => {
        // handle error
        console.log(err);
      },
    })
  },
  //获取用户openid，并判断是否为管理员的openid
  getOpenid:function() {
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
          if(res.result=='admin'){
            wx.showModal({
              title: '提示',
              content: '您无访问权限',
              success(res) {
                if (res.confirm) {
                  wx.navigateBack({
                    delta: 1
                  })
                } else if (res.cancel) {
                  wx.navigateBack({
                    delta: 1
                  })
                }
              }
            })
          }
        }).catch(console.error);
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getOpenid();
    this.queryAdmin();
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

  }
})