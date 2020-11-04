const Router = require('koa-router');
const config = require('../../config');
const tools = require('../../tools')
const common = require('../../libs/common')

let router = new Router();

router.post('/excelToJson', async ctx => {
  if (ctx.request.fields) {
    let file = Array.from(ctx.request.fields.files)[0];
    if (!file) {
      ctx.body = {
        error: 1,
        msg: '文件不存在'
      };
      return;
    }
    console.log('file:', file)
    tools.excelToJson(file.path, data => {
      common.unlink(file.path);
      ctx.body = {
        error: 0,
        data: data
      };
    });
  } else {
    ctx.body = {
      error: 1
    };
  }
})

router.post('/uploadFile', async ctx => {
  if (ctx.request.fields) {
    let file = ctx.request.fields.file;
    if (!file) {
      ctx.body = {
        error: 1,
        msg: '文件不存在'
      };
      return;
    }
    ctx.body = {
      error: 0,
      body: file,
      msg: '上传成功'
    }
  } else {
    ctx.body = {
      error: 1
    }
  }
})

module.exports = router.routes();