var app = getApp();
Page({
	data: {
		cardCur: 0,
		swiperList: [],//轮播列表
		msg:[],//推荐列表
		searchQuery:"",
		recommendList:[]//推荐列表
	},
	onLoad() {
		this.towerSwiper('swiperList');// 初始化轮播图
		wx.cloud.callFunction({//获取推荐信息
			name:"queryRecommends"
		}).then(res=>{
			this.setData({
				recommendList:res.result.list,
			})
		})
		wx.cloud.callFunction({//获取轮播信息
			name: "queryRecommendIV"
		}).then(res => {
			this.setData({
				swiperList: res.result.list
			})
		})
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
	searchEvent(data){
		let city = data.detail.region[1] === "不限" ? "" : data.detail.region[1];
		let province = data.detail.region[0] === "不限" ? "" : data.detail.region[0];
		let educationBg = data.detail.educationBg === "不限" ? "" : data.detail.educationBg;
		let query={
			title: data.detail.title,
			city: city,
			company: data.detail.company,
			edu_back: educationBg +" " +data.detail.major,
			salary:Number(data.detail.money),
			province: province,
			type:"one",
			state:2
		}
		console.log(query);
		wx.cloud.callFunction({
			name:"queryUrl",
			data:query
		}).then(res=>{
			app.globalData.msgList = res.result.data;
			wx.navigateTo({
				url: '../result/result',
			})
			console.log(app.globalData.msgList)
		})
	}
})