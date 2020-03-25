// packageAdmin/pages/pending/pending.js
let app= getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		list: [],
		modalName: null,
		listTouchStart: 0,
		listTouchDirection: null,
	},
	// ListTouch触摸开始
	ListTouchStart(e) {
		this.setData({
			ListTouchStart: e.touches[0].pageX
		})
	},

	//  ListTouch计算方向

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
	//copy复制
	copy(e) {
		let index = e.currentTarget.dataset.index;
		let url = this.data.list[index].url;
        let reg = /https:\/\/open.work.weixin.qq.com\/wwopen\//g;
        this.setData({
          judge: reg.test(url)
        })
		if (this.data.judge) {
			app.globalData.url = url;
			wx.navigateTo({url: "../showArticle/showArticle"})
		} else {
			wx.setClipboardData({
				data: url,//推送链接
				success: function (res) {
					wx.getClipboardData({
						success: function (res) {
							wx.showToast({
								title: '已复制链接'
							})
						}
					})
				}
			})
		}
	},
	//delete删除
	delete11(e) {
		let that = this;
		let index = e.currentTarget.dataset.indexdel;
		let list = that.data.list;
		let id = list[index].id;
		wx.showModal({
			title: '是否确定删除内容？',
			success: function (res) {
				if (res.confirm) {                  //点击确定后
					list.splice(index, 1);       //截取指定的内容
					console.log(id);
					that.setData({               //重新渲染列表
						list: list
					});
					//向后台传送删除的信息
					wx.cloud.callFunction({
						name: 'deleteUrl',
						data: {
							id: id
						}
					}).then((res) => {
						console.log(res)
					})


				}
			}
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		let that = this;
		let list = that.data.list;
		wx.cloud.callFunction({
			name: 'queryUrl',
			data: {
				state: 1,
				type: "two"
			}
		}).then((res) => {
			if (res.result.data.length != 0) {
				that.setData({
					none: false
				})
				let array = res.result.data;
                that.setData({
                    list: array
                })
			}
		})
	},


})