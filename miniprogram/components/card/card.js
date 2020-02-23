// components/card/card.js
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
    },

    /**
     * 组件的方法列表
     */
    methods: {
        //长按复制
        copyUrl(event) {
            var url = event.currentTarget.dataset.url;
			wx.setClipboardData({
				data: this.data.card.url,//推送链接
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
        }
    }
})
