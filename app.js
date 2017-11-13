var settings = require('./settings')
const Promise = require('bluebird');
const request = require('request');
const mongoose = require('mongoose');
const util = require('util');
const colors = require('colors');

var express = require('express')
var app = express();

app.use(function(req,resp,next){
    util.log(req.method.yellow + ' ' + req['url']);
    next();
});

/**
 * 处理服务通知，具体参见 
 * https://sheet.postio.me/doc/api/dev.html
 */
app.post('/',(req,resp)=>{
    let body = '';
    req.on('data', (data)=>{
        body += data;
        if (body.length > 1e6) {
            req.connection.destroy();
        }
    });
    req.on('end',()=>{
        try{
            var payload = JSON.parse(body);
        }catch(e){
            return resp.json({err:'数据解析异常'})
        };
        var event = payload['event'];
        util.log(`received event:[ ${event} ]`);
        switch(event){
            case 'installed':
                /*    { 
                 *        event:'installed', 
                 *        data:{ 
                 *            user: { 
                 *                uid: uid, 
                 *                sheet: doc['_id'] 
                 *            }, 
                 *            authorize: { 
                 *                uid: ..., 
                 *                ticket: .... 
                 *            } 
                 *        } 
                 *    } 
                 */
                var data = payload['data'];
                resp.json({err:null});
                break;
            case 'conf':
                /* {
                 *     event:'conf',
                 *     data:{
                 *         authorize:{
                 *             uid: ....
                 *         },
                 *         conf: conf
                 *     }
                 * }
                 */
                var data = payload['data'];
                resp.json({err:null});
                break;
            case 'removed':
                /*  {
                 *      event:'removed',
                 *      data:{
                 *          authorize:{
                 *              uid: ....
                 *          }
                 *      }
                 *  }  
                 */
                var data = payload['data'];
                break;
            case 'trigger':
                /* {
                 *    event:'trigger',
                 *    data:{
                 *         authorize: {
                 *             uid: ....
                 *         },
                 *        context:context,
                 *        record:data
                 *    }
                 *  }
                 */
                var data = payload['data'];
                resp.json({err:null});
                break;
        }
    })
});

/* start listening ... */
app.listen(settings.port);
util.log(`service runnng port:[ ${settings.port} ]`.green);