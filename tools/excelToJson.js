const xl = require('xlsx');
const fs = require('fs');
const path = require('path');

module.exports = async function(input,cb){
  //workbook 对象，指的是整份 Excel 文档。我们在使用 js-xlsx 读取 Excel 文档之后就会获得 workbook 对象。
  const workbook = await xl.readFile(input,{
    type: 'binary'
  })

  if(!workbook) return {};

  const sheetNames = workbook.SheetNames;

  const worksheet = workbook.Sheets[sheetNames[0]];

  //返回json数据
  let data = await xl.utils.sheet_to_json(worksheet);

  cb && cb(data);

  // console.log('TODO 将转换后的数据显示到浏览器页面上!')
}

