// miniprogram/packageAdmin/pages/upload/upload.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		bool:false,
		url:"",
		path:""
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

	},
	upload(){
		console.log(111)
		wx.chooseMessageFile({
			count:1,
			type:"file",
			success:(res)=>{
				let path = res.tempFiles[0].path;
				let reg = /.(xlsx|xls|csv)/g;
				this.setData({
					bool:reg.test(path)
				})
				console.log(res)
				if(this.data.bool){
					this.setData({
						url:res.tempFiles[0].name
					})
					this.setData({
						path:path
					})
				}else {
					wx.showModal({title:"错误",content:"请上传格式正确的文件"});
				}
			}
		})
	},
	cancel(){// 取消上传
		this.setData({
			bool:false,
			url:"",
			path:""
		})
	},
	submit(){
		if(!this.data.path){
			wx.showModal({title:"错误",content:"请上传文件"});
		}else {
			console.log(`ExcelFile/${new Date().getTime()}${this.data.url}`)
			console.log(this.data.path)
			wx.cloud.uploadFile({
				cloudPath:`ExcelFile/${new Date().getTime()}${this.data.url}`,
				filePath:this.data.path,
				success:(res)=>{
					wx.showToast({
						title:"上传成功"
					})
					this.setData({
						bool:false,
						url:"",
						path:""
					})
				},
				fail:err=>{
					wx.showModal({title:"错误",content:"上传失败"});
				}
			})
		}
	}
})