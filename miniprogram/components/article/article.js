// components/article/article.js
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		url:{
			type:String,
			required:true

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

	},
	attached() {
		console.log(this.properties.url);
	}
})
