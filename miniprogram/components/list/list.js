// components/list/list.js
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		list:{
			type:Array,
			default:[]
		}
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
		clickCopy(e) {
			wx.setClipboardData({//设置剪贴板数据
				data: e.currentTarget.dataset.src,
				success: function (res) {
					wx.getClipboardData({//获取剪贴板数据
						success: function (res) {
							wx.showToast({
								title: '复制链接成功'
							})
						}
					})
				}
			})
		}
	}
})
