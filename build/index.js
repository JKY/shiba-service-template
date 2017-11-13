const request = require('request');
const settings = require('../settings');
const util = require('util');
const colors = require('colors');

/**
 *  根据账户信息获取 ticket 
 */
const __login = function(email,passwd,callback){
	request({
		url:`https://sheet.postio.me/api/usr`,
		method:'POST',
		body: JSON.stringify({
		    	action:"login",
		    	email:email,
		    	passwd:passwd
			   })
	    },(err,resp,body)=>{
			if(err || resp.statusCode != 200 ){
				callback(`无法访问服务`);
			}else{
				var result = JSON.parse(body);
				if(result['err']){
					callback(result['err']);
				}else{
					callback(null,result['result']['ticket']);
				}
			}
	   })
};

/**
 * 提交服务
 */
const __commit = function(ticket,callback){
	if(!settings.conf.name){
		return callback(`请设置服务名称`)
	};
	if(!settings.conf.uri){
		return callback(`服务地址尚未设置`)
	};
	if(!settings.conf.label){
		return callback(`请设置服务名称`)
	};
	var data = {
		name: settings.conf.name,
		label: settings.conf.label,
		desc: settings.conf.desc,
		keywords:settings.conf.keywords,
		public: settings.conf.public,
		uri: settings.conf.uri,
		conf: settings.conf.conf
	};
	request({
		url:`https://sheet.postio.me/api/sheet/service`,
		method:'POST',
		headers:{
			ticket: ticket
		},
		body:JSON.stringify(data)
	},(err,resp,body)=>{
		if(err || resp.statusCode !== 200){
			callback(`暂时无法连接`)
		}else{
			callback(null,JSON.parse(body));
		}
	});
};

util.log(`start login with user:${settings.account.email} ... `.yellow);
__login(settings.account.email,settings.account.passwd,(err,ticket)=>{
	if(err){
		util.log(`login failed:${err}`.red);
	}else{
		util.log(`login successfully, commit service ...`.yellow);
		__commit(ticket,(err,resp)=>{
			if(err){
				util.log(`commit with error:${err}`.red)
			}else{
				if(resp['err']){
					util.log(`commit failed:${resp.err}`.red)
				}else{
					util.log(`service commited!`.green)
				}
			}
		});
	}
});