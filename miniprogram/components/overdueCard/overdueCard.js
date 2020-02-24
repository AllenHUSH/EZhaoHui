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
		copyUrl(){
			wx.setClipboardData({
				data: this.properties.card.url,//推送链接
				success: function (res) {
					wx.getClipboardData({
						success: function (res) {
							wx.showToast({
								title: '复制链接成功'
							})
						}
					})
				}
			})
		},
		onDelete(e) {
			let id = this.properties.card._id;
			if (this.properties.card.state===3){//删除
				wx.showModal({
					title: '删除推送',
					content: '是否要删除该推送？',
					showCancel: true,//是否显示取消按钮
					cancelText: "否",//默认是取消
					cancelColor: '#999',//取消文字的颜色
					confirmText: "是",//默认是“确定”
					confirmColor: 'red',//确定文字的颜色
					success: (res)=>{
						if (res.cancel) {

						} else {
							wx.cloud.callFunction({
								name: 'deleteUrl',
								data: {
									id: id,
								},
								success: res => {
									this.triggerEvent('deleteItem', this.properties.index)
									wx.showToast({
										title: '删除成功'
									})
									if (this.properties.card.picture) {
										wx.cloud.deleteFile({
											fileList: [this.properties.card.picture]
										}).then(res => {
											console.log(res.fileList, "删除成功")
										}).catch(error => {
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
						}
					},
					fail: function (res) { },//接口调用失败的回调函数
					complete: function (res) { },//接口调用结束的回调函数（调用成功、失败都会执行）
				})	
			}else{//手动过期
				wx.showModal({
					title: '过期推送',
					content: '是否要将该推送过期？',
					showCancel: true,//是否显示取消按钮
					cancelText: "否",//默认是取消
					cancelColor: '#999',//取消文字的颜色
					confirmText: "是",//默认是“确定”
					confirmColor: 'red',//确定文字的颜色
					success:  (res)=>{
						if (res.cancel) {
						} else {
							wx.cloud.callFunction({
								// 要调用的云函数名称
								name: 'updateUrl',
								// 传递给云函数的参数
								data: {
									id: id,
									state: 3,
									end_time: JSON.stringify(new Date(1970, 0, 0)).split('"')[1]
								},
								success: res => {
									this.triggerEvent('overdueItem', this.properties.index)
									wx.showToast({
										title: '过期成功'
									})
								},
								fail: err => {
									console.log(err);
								}
							})
						}
					},
					fail: function (res) { },//接口调用失败的回调函数
				})
			}
			
		},
		onChange(e){
			this.triggerEvent('editShow', { card:this.properties.card, index:this.properties.index })
		}
	}
})
