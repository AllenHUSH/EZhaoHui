// miniprogram/packageAdmin/pages/overdue/overdue.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		overdueList:[]
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		wx.cloud.callFunction({
			name:"queryUrl",
			data:{
				type:"two",
				state:3
			}
		}).then(res=>{
			this.setData({
				overdueList:res.result.data
			})
		})
	},
})