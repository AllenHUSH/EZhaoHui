// miniprogram/pages/admin/admin_home/admin_home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    elements: [{
        title: '待处理',
        name: 'pending',
        color: 'cyan',
        icon: 'writefill'
      },
      {
        title: '未通过',
        name: 'not pass',
        color: 'blue',
        icon: 'roundclosefill'
      },
      {
        title: '已过期',
        name: 'out of date',
        color: 'purple',
        icon: 'timefill',
      },
      {
        title: '公布中',
        name: 'publishing',
        color: 'mauve',
        icon: 'settingsfill'
      },
    ],
    processedElements: [{
        title: '推荐',
        name: 'icon',
        color: 'mauve',
        icon: 'icon'
      },
      {
        title: '按钮',
        name: 'button',
        color: 'pink',
        icon: 'btn'
      },
      {
        title: '标签',
        name: 'tag',
        color: 'brown',
        icon: 'tagfill'
      },
      {
        title: '头像',
        name: 'avatar',
        color: 'red',
        icon: 'myfill'
      },
      {
        title: '进度条',
        name: 'progress',
        color: 'orange',
        icon: 'icloading'
      },
      {
        title: '边框阴影',
        name: 'shadow',
        color: 'olive',
        icon: 'copy'
      },
      {
        title: '加载',
        name: 'loading',
        color: 'green',
        icon: 'loading2'
      },
    ],
    url: ""
  },
  formSubmit: function(e) {  
    console.log('form发生了submit事件，携带数据为：', e.detail.value);  
    let {
      url
    } = e.detail.value;  
    this.setData({    
      url
    }) 
    wx.cloud.callFunction({
      // 要调用的云函数名称
      name: 'insertUrl',
      // 传递给云函数的event参数
      data: {
        target_url:this.data.url,
        username:"as"
      }
    }).then(res => {
      console.log(res) 
    }).catch(err => {
      console.log(err)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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