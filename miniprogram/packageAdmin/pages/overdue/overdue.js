// miniprogram/packageAdmin/pages/overdue/overdue.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		overdueList:[],
		customItem: ['不限'],
		salaryAList: ['不限', "1k-5k", '5k-10k', '10k-15k', '15k-20k', '20k+'],
		eduList: ['不限', '本科', '研究生'],
		imgList: [],
		carousel: false,//当前设置是否是轮播图
		recommend: false,//当前设置是否是推荐
		card:{},
		currentIndex:0
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {//请求 过期数据
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
		
		
	},//删除
	deleteItem(e){
		let list = this.data.overdueList;
		list.splice(e.detail, 1);
		this.setData({
			overdueList: list
		})
	},//显示抽屉
	editShow(e){
		let currentData = {
			id: e.detail.card._id,
			city: e.detail.card.city,
			company: e.detail.card.company,
			create_time: e.detail.card.create_time.split("T")[0],
			major: e.detail.card.edu_back.split(" ")[1],
			edu: e.detail.card.edu_back.split(" ")[0],
			end_time: e.detail.card.end_time.split("T")[0],
			info: e.detail.card.info,
			menbers: e.detail.card.menbers,
			picture: e.detail.card.picture ? e.detail.card.picture : "",
			province: e.detail.card.province,
			title: e.detail.card.title,
			salary: e.detail.card.salary ? e.detail.card.salary : 0,
			state: 2,
		}
		this.setData({
			modalName: "viewModal",
		})
		this.setData({
			card: currentData
		})
		this.setData({
			currentIndex: e.detail.index
		})
		if (e.detail.card.picture) {
			this.setData({
				imgList: [e.detail.card.picture]
			})
		}
	},//隐藏抽屉
	hideModal(e) {
		this.setData({
			modalName: null,
		})
		this.setData({
			imgList: [],
		})
		this.setData({
			card: {}
		})
	},
	//标题
	onTitle: function (e) {
		let str = "card.title"
		this.setData({
			[str]: e.detail.value
		});
	},
	//专业
	onMajor: function (e) {
		let str = "card.major"
		this.setData({
			[str]: e.detail.value
		});
	},
	//公司名称
	onCompany: function (e) {
		let str = "card.company"
		this.setData({
			[str]: e.detail.value
		});
	},
	//招聘人数
	onPeopleNum: function (e) {
		let str = "card.menbers"
		this.setData({
			[str]: e.detail.value
		});
	},
	//薪资
	PickerChangeA(e) {
		let str = "card.salary"
		this.setData({
			[str]: e.detail.value
		});
	},
	//学历
	PickerChangeB(e) {
		let str = "card.edu"
		this.setData({
			[str]: this.data.eduList[e.detail.value]
		});
	},
	//改变开始时间
	DateStartChange: function (e) {
		let str = "card.create_time"
		this.setData({
			[str]: e.detail.value
		});
	},
	// 改变结束时间
	DateEndChange: function (e) {
		let str = "card.end_time"
		this.setData({
			[str]: e.detail.value
		});
	},
	//地址
	RegionChange: function (e) {
		let str = "card.city"
		this.setData({
			[str]: e.detail.value[1]
		});
		let str1 = "card.province"
		this.setData({
			[str1]: e.detail.value[0]
		});
	},
	//多行文本
	textareaAInput(e) {
		let str = "card.info"
		this.setData({
			[str]: e.detail.value
		});
	},
	//图片
	ChooseImage() {
		wx.chooseImage({
			count: 1, //默认9
			sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album'], //从相册选择
			success: (res) => {
				if (this.data.imgList.length != 0) {
					this.setData({
						imgList: this.data.imgList.concat(res.tempFilePaths)
					})
				} else {
					this.setData({
						imgList: res.tempFilePaths
					});
				}
			}
		});
	},
	ViewImage(e) {
		wx.previewImage({
			urls: this.data.imgList,
			current: e.currentTarget.dataset.url
		});
	},
	DelImg(e) {
		wx.showModal({
			title: '',
			content: '确定要删除吗？',
			cancelText: '取消',
			confirmText: '确定',
			success: res => {
				if (res.confirm) {
					this.data.imgList.splice(e.currentTarget.dataset.index, 1);
					this.setData({
						imgList: this.data.imgList
					})
				}
			}
		})
	},
	//是否设为轮播
	onCarousel(e) {
		this.setData({
			carousel: e.detail.value
		})
	},
	//是否设为推荐
	onRecommend(e) {
		this.setData({
			recommend: e.detail.value
		})
	},
	//编辑键
	onSubmit(e) {
		//上传图像
		
		let infoList = {
			id: this.data.card.id,
			province: this.data.card.province,
			city: this.data.card.city,
			company: this.data.card.company ? this.data.card.company:"",
			create_time: this.data.card.create_time,
			end_time: this.data.card.end_time,
			salary: Number(this.data.card.salary),
			menbers: this.data.card.menbers,
			edu_back: this.data.card.edu + ' ' + (this.data.card.major ? this.data.card.major:"专业不限"),
			info: this.data.card.info,
			picture: this.data.imgList[0] ? this.data.imgList[0]:"",
			state: 2,
			title: this.data.card.title,
		};
		if (this.data.imgList.length&&(this.data.imgList[0]!=this.data.card.picture)){//说明有新图片上传
			let nowDate = new Date();
			// 图像命名 时间戳 + 本身名字
			let filePath = this.data.imgList[0];
			let cloudPath = "url_images/" + this.data.card.id + filePath.match(/\.[^.]+?$/)[0];
			wx.cloud.uploadFile({
				cloudPath,
				filePath,
				success: res => {
					console.log('[上传文件] 成功：', cloudPath, res, res.fileID);
					// 成功则将表单推送到后台，因为图像传的比较慢，而表单里有picture，所以图像传成功之后传表单
					infoList.picture = res.fileID;
					wx.cloud.callFunction({
						// 要调用的云函数名称
						name: 'updateUrl',
						// 传递给云函数的参数
						data: infoList,
						success: res => {
							wx.showToast({
								title: '编辑成功'
							})
							let list = this.data.overdueList;
							list.splice(this.data.currentIndex, 1);
							this.setData({
								overdueList: list
							})
							this.setData({
								modalName: null
							})
							this.setData({
								imgList:[]
							})
							this.setData({
								carousel: false,
							})
							this.setData({
								recommend: false
							})
						
						},
						fail: err => {
							console.log(err);
						}
					})
				},
			});
		}else{
			wx.cloud.callFunction({
				// 要调用的云函数名称
				name: 'updateUrl',
				// 传递给云函数的参数
				data: infoList,
				success: res => {
					wx.showToast({
						title: '编辑成功'
					})
					let list = this.data.overdueList;
					list.splice(this.data.currentIndex, 1);
					this.setData({
						overdueList: list
					})
					this.setData({
						modalName: null
					})
					this.setData({
						imgList: []
					})
					this.setData({
						carousel: false,
					})
					this.setData({
						recommend: false
					})
				},
				fail: err => {
					console.log(err);
				}
			})
		}

		//设为轮播图
			if (this.data.carousel){//设置为轮播
				wx.cloud.callFunction({
					// 要调用的云函数名称
					name: 'insertRecommendIV',
					// 传递给云函数的参数
					data: {
						url_id: this.data.card.id
					},
					success: res => {
						console.log(res);
						console.log(this.data.card.id)
					},
					fail: err => {
						console.log(err);
					}
				})
			
		//设为推荐列表
			if (this.data.recommend){//设置为推荐
				wx.cloud.callFunction({
					// 要调用的云函数名称
					name: 'insertRecommend',
					// 传递给云函数的参数
					data: {
						url_id: this.data.card.id,
					},
					success: res => {
					},
					fail: err => {
						throw err;
					}
				})
			}
			
		}
	}
})