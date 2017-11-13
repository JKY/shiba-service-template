module.exports = {
	port:6000,
	account:{
		email:'foo@postio.me',
		passwd:'123456'
	},
	conf: {
		/** 服务唯一的标识 **/
		name:'com.postio.servoce.foo',
		/** 显示的名称 **/
		label:'扩展示例',
		/** 搜索的关键字 **/
		keywords:'foo', 
		/** 服务功能描述 **/
		desc:'...',
		/** 是否为公开服务 **/
		public:false,
		/** 服务地址 **/
		uri:'http://51266c98.ngrok.io',
		/** 
		 * 用户设置,
		 * 具体参见: https://sheet.postio.me/doc/api/dev.html
		 **/
		conf:[]
	}
}