// miniprogram/pages/result/result.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    li:"dd"
  },
  onLongpress:function(event){
    console.log("ddd");
    var url=event.currentTarget.dataset.url;
    
    wx.setClipboardData({
      data: url,
      success:function(res){
        wx.getClipboardData({
          success:function(res){
            console.log(res.data);
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var arr = ["bg-red","bg-orange","bg-yellow",
"bg-purple","bg-olive","bg-green","bg-cyan","bg-blue",
"bg-brown"];
    var result_content=[
      {
        iscolor:false,//判断是否有颜色
        color: arr[Math.floor((Math.random()*arr.length))],
        picture:'',//判断是否有图片
        _id:'kdgjrghurgnurgg',
        city:'长春市',
        company:'东师理想',
        creat_time:'Sun Feb 16 2020',
        end_time:'Sun Feb 16 2020',
        edu_back:'本科 计算机',
        info:'薪资80/天 不包吃住 无转正',
        province:'吉林省',
        title:'东师理想春季招聘（20补招/21实习）',
        url:'jmjimni'
      },{
        iscolor:false,
        color: arr[Math.floor((Math.random()*arr.length))],
        picture:'',
        _id:'kdgjrghurgnurgg',
        city:'',
        company:'中国联通移动',
        creat_time:'Sun Feb 16 2020',
        end_time:'Sun Feb 16 2020',
        edu_back:'本科 计算机',
        info:'20-40k',
        province:'上海',
        title:'中国移动招实习生',
        url:'jjjjj'
      },{
        iscolor:true,
        color: arr[Math.floor((Math.random()*arr.length))],
        picture:'',
        _id:'kdgjrghurgnurgg',
        city:'',
        company:'中国联通移动',
        creat_time:'Sun Feb 16 2020',
        end_time:'Sun Feb 16 2020',
        edu_back:'本科 计算机',
        info:'20-40k',
        province:'上海',
        title:'中国移动招实习生',
        url:'jjjjj'
      },{
        iscolor:true,
        color: arr[Math.floor((Math.random()*arr.length))],
        picture:"/images/result/u=2399821824,1913911900&fm=26&gp=0.jpg",
        _id:'kdgjrghurgnurgg',
        city:'',
        company:'东师理想',
        creat_time:'Sun Feb 16 2020',
        end_time:'Sun Feb 16 2020',
        edu_back:'本科 计算机',
        info:'薪资80/天 不包吃住 无转正',
        province:'',
        title:'东师理想春季招聘（20补招/21实习）',
        url:'jjjjj'
      }
    ]
    this.setData({result_content});
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