Page({
  data: {
    cardCur: 0,
    swiperList: [{//轮播图模拟数据
      id: 0,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
    }, {
      id: 1,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
    }, {
      id: 3,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
    }, {
      id: 4,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
    }, {
      id: 5,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
    }, {
      id: 6,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
    }],
    msg: [//搜索下方数据
      {
        id: 0,
        company: "单位",
        work_name: "职位名称",
        industry: "行业",
        time: "招聘时间",
        desc: "描述"
      }, {
        id: 0,
        company: "单位",
        work_name: "职位名称",
        industry: "行业",
        time: "招聘时间",
        desc: "描述"
      }, {
        id: 0,
        company: "单位",
        work_name: "职位名称",
        industry: "行业",
        time: "招聘时间",
        desc: "描述"
      }, {
        id: 0,
        company: "单位",
        work_name: "职位名称",
        industry: "行业",
        time: "招聘时间",
        desc: "描述"
      }
    ],
    searchQuery: ""
  },
  onLoad() {
    this.towerSwiper('swiperList');// 初始化轮播图
    // wx.request({//请求 轮播数据
    // 	url: '',
    // 	header: {
    // 		'content-type': 'application/json' // 默认值
    // 	},
    // 	data:{},
    // 	success(res){
    // 		this.setData({
    // 			swiperList: res.data
    // 		})
    // 		this.towerSwiper('swiperList');// 初始化轮播图
    // 	},
    // 	fail(err){
    // 		throw err;
    // 	}
    // });
    // wx.request({//请求下面招聘信息
    // 	url: '',
    // 	header: {
    // 		'content-type': 'application/json' // 默认值
    // 	},
    // 	data: {},
    // 	success(res) {
    // 		this.setData({
    // 			magList: res.data
    // 		})
    // 	},
    // 	fail(err) {
    // 		throw err;
    // 	}
    // })
  },
  DotStyle(e) {
    this.setData({
      DotStyle: e.detail.value
    })
    console.log(e.detail)
  },
  // cardSwiper
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  towerSwiper(name) {//初始化
    let list = this.data[name];
    for (let i = 0; i < list.length; i++) {
      list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
      list[i].mLeft = i - parseInt(list.length / 2)
    }
    this.setData({
      swiperList: list
    })
  },
  // towerSwiper触摸开始
  towerStart(e) {
    this.setData({
      towerStart: e.touches[0].pageX
    })
  },
  // towerSwiper计算方向
  towerMove(e) {
    this.setData({
      direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
    })
  },
  // towerSwiper计算滚动
  towerEnd(e) {
    let direction = this.data.direction;
    let list = this.data.swiperList;
    if (direction == 'right') {
      let mLeft = list[0].mLeft;
      let zIndex = list[0].zIndex;
      for (let i = 1; i < list.length; i++) {
        list[i - 1].mLeft = list[i].mLeft
        list[i - 1].zIndex = list[i].zIndex
      }
      list[list.length - 1].mLeft = mLeft;
      list[list.length - 1].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    } else {
      let mLeft = list[list.length - 1].mLeft;
      let zIndex = list[list.length - 1].zIndex;
      for (let i = list.length - 1; i > 0; i--) {
        list[i].mLeft = list[i - 1].mLeft
        list[i].zIndex = list[i - 1].zIndex
      }
      list[0].mLeft = mLeft;
      list[0].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    }
  },
  searchRequest(e) {
    if (!this.data.searchQuery) {
      console.log("没有");
      return;
    } else {
      // wx.request({//请求 搜索结果
      // 	url: '',
      // 	header: {
      // 		'content-type': 'application/json' // 默认值
      // 	},
      // 	data:{
      // 		query: this.data.searchQuery
      // 	},
      // 	success(res){
      // 		wx.navigateTo({//跳转到信息显示页
      // 			url: '../result/result',
      // 		})
      // 	},
      // 	fail(err){
      // 		throw err;
      // 	}
      // });
      console.log("请求搜索结果")
    }
  },
  inputQuery(e) {//双向绑定
    let input = e.detail.value;
    this.setData({
      searchQuery: input
    })
  },

})