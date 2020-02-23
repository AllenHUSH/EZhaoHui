// packageAdmin/pages/pending/pending.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    modalName: null,
    listTouchStart: 0,
    listTouchDirection: null,
  },
  // ListTouch触摸开始
  ListTouchStart(e) {
    this.setData({
      ListTouchStart: e.touches[0].pageX
    })
  },

  //  ListTouch计算方向

  ListTouchMove(e) {
    this.setData({
      ListTouchDirection: e.touches[0].pageX - this.data.ListTouchStart > 0 ? 'right' : 'left'
    })
  },

  // ListTouch计算滚动
  ListTouchEnd(e) {
    if (this.data.ListTouchDirection == 'left') {
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    } else {
      this.setData({
        modalName: null
      })
    }
    this.setData({
      ListTouchDirection: null
    })
  },
  //copy复制
  copy(e) {
    wx.showToast({
      title: '复制成功',
    })
    let index = e.currentTarget.dataset.index;
    let data = this.data.list[index].url;
    // console.log(data);
    wx.setClipboardData({
      data: data,
      success: function (res) {
        wx.getClipboardData({    //这个api是把拿到的数据放到电脑系统中的
          success: function (res) {
            // console.log(res.data) // data
          }
        })
      }
    })
  },
  //delete删除
  delete(e){
    let that =this;
    let index = e.currentTarget.dataset.indexdel;
    let list = that.data.list;
    let id=list[index].id;
    wx.showModal({
      title: '是否确定删除内容？',
      success: function (res) {
        if (res.confirm) {                  //点击确定后
          list.splice(index, 1);       //截取指定的内容
          console.log(id);
          that.setData({               //重新渲染列表
            list: list
          });
          //向后台传送删除的信息
          wx.cloud.callFunction({
            name: 'deleteUrl',
            data: {
              id: id
            }
          }).then((res) => {
            console.log(res)
          })


        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    let list = that.data.list;
    wx.cloud.callFunction({
      name: 'queryUrl',
      data: {
        state:1,
        type:"two"
      }
    }).then((res)=>{
      console.log(res);
      if (res.result.data.length!=0){
        that.setData({
          none:false
        })
      // console.log(res);
      // console.log(res.result.data[0].url);
      let array=res.result.data;
      array.forEach(function (item,index){
        console.log(item.url);
        console.log(index);
        let obj={
          url: item.url,
          id: item._id
          };
        console.log(obj);
        list.push(obj);
        console.log(list);
        that.setData({
          list: list
        })
      })
      }
    })
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

  }
})