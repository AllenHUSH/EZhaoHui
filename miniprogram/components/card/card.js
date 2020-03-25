// components/card/card.js
let app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        // 从外面传进来
        card: {
            type: Object,
            default: {}
        },
		number:{
			type:Number,
			default:0
		}
    },

    /**
     * 组件的初始数据
     */
    data: {
		color: ["bg-gradual-red", "bg-gradual-orange", "bg-gradual-green", "bg-gradual-blue", "bg-gradual-purple", "bg-gradual-pink",],
        judge:false
    },

    /**
     * 组件的方法列表
     */
    methods: {
        //长按复制
        copyUrl(event) {
            var url = event.currentTarget.dataset.url;
            if(this.data.judge){
	            app.globalData.url = this.properties.card.url;
				wx.navigateTo({url:"../showArticle/showArticle"})
            }else {
	            wx.setClipboardData({
		            data: this.data.card.url,//推送链接
		            success: function (res) {
			            wx.getClipboardData({
				            success: function (res) {
					            wx.showToast({
						            title: '由于不是公众号内文章无法跳转，已复制链接'
					            })
				            }
			            })
		            }
	            })
            }

        }
    },
	attached(){
		let reg = /https:\/\/open.work.weixin.qq.com\/wwopen\//g;
    	this.setData({
		    judge:reg.test(this.properties.card.url)
	    })
	}
})
