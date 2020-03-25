// miniprogram/pages/showArticle/showArticle.js
let app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		url:""
	},

	onLoad: function (options) {
		this.setData({
			url:app.globalData.url
		})
	}
})