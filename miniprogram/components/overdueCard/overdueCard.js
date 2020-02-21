// components/overdueCard/overdueCard.js
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		card:{
			type:Object,
			default:{}
		},
		index:{
			type: Number
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
		// ListTouch触摸开始
		ListTouchStart(e) {
			this.setData({
				ListTouchStart: e.touches[0].pageX
			})
		},

		// ListTouch计算方向
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
		onDelete(e) {
			let id = this.properties.card._id;
			wx.cloud.callFunction({
				// 要调用的云函数名称
				name: 'deleteUrl',
				// 传递给云函数的参数
				data: {
					id: id,
				},
				success: res => {
					this.triggerEvent('deleteItem', this.properties.index)
					wx.showToast({
						title: '删除成功'
					})
					if(this.properties.card.picture){
						wx.cloud.deleteFile({
							fileList: [this.properties.card.picture]
						}).then(res => {
							// handle success
							console.log(res.fileList, "删除成功")
						}).catch(error => {
							// handle error
						})
					}
				},
				fail: err => {
					console.log(err);
					wx.showToast({
						title: '删除失败'
					})
				}
			})
		},
		onChange(e){
			this.triggerEvent('editShow', { card:this.properties.card, index:this.properties.index })
		}
	}
})
