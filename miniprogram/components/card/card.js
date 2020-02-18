// components/card/card.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
// 从外面传进来
    iscolor:{
      type:Boolean,
      value:false,
    },//判断是否有颜色
    color:{
      type: String,
      value: '',
    },
    picture: {
      type: String,
      value: '',
    },//判断是否有图片
    _id: {
      type: String,
      value: '',
    },
    city: {
      type: String,
      value: '',
    },
    company: {
      type: String,
      value: '',
    },
    creat_time: {
      type: String,
      value: '',
    },
    end_time: {
      type: String,
      value: '',
    },
    edu_back: {
      type: String,
      value: '',
    },
    info: {
      type: String,
      value: '',
    },
    province: {
      type: String,
      value: '',
    },
    title: {
      type: String,
      value: '',
    },
    url: {
      type: String,
      value: '',
    },
    
    
    
  },

  /**
   * 组件的初始数据
   */
  data: {
     
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //长按复制
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
    }

  }
})
