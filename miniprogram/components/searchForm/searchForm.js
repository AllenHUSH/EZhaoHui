// components/searchForm/searchForm.js
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {

	},

	/**
	 * 组件的初始数据
	 */
	data: {
		major:"",
		station: "",
		company: "",
		educationBgList: ["本科", "研究生"],
		educationBg: 0,
		region: ['广东省', '广州市', '海珠区'],
		money: 0,
		moneyList: ["5k-10k", "10k-15k", "15k-20k", "20k+"]
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		MajorChange(e){
			this.setData({
				major: e.detail.value
			})
		},
		stationChange(e) {
			this.setData({
				station: e.detail.value
			})
		},
		companyChange(e) {
			this.setData({
				company: e.detail.value
			})
		},
		eduChange(e) {
			this.setData({
				educationBg: e.detail.value
			})
		},
		RegionChange(e) {
			this.setData({
				region: e.detail.value
			})
		},
		moneyChange(e) {
			this.setData({
				money: e.detail.value
			})
		},
		searchRequest(){
			let queryData = {
				major:this.data.major,
				station: this.data.station,
				company: this.data.company,
				money: this.data.moneyList[this.data.money],
				region: this.data.region,
				educationBg: this.data.educationBgList[this.data.educationBg]
			};
			this.triggerEvent('queryEvent', queryData) 
		}
	}
})
