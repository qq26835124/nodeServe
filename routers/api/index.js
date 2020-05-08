const Router = require('koa-router');
const config = require('../../config');
const tools = require('../../tools')
const common = require('../../libs/common')

console.log('tools:',tools)

let router = new Router();

router.post('/excelToJson', async ctx => {
  if(ctx.request.fields){
    let file = Array.from(ctx.request.fields.files)[0];
    if(!file){
      ctx.body = {
        error: 1,
        msg: '文件不存在'
      };
      return;
    }
    console.log('file:',file)
    tools.excelToJson(file.path, data => {
      common.unlink(file.path);
      ctx.body = {
        error: 0,
        data: data
      };
    });
  }else{
    ctx.body = {
      error: 1
    };
  }
})

module.exports = router.routes();