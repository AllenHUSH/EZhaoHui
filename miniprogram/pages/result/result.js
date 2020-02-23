// miniprogram/pages/result/result.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
	data: {
		result_content: []
	},
    /**
     * 生命周期函数--监听页面加载
     */
	onLoad: function (options) {
		this.setData({
			result_content: app.globalData.msgList
		})
	},
})