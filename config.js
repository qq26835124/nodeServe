const path = require('path');

module.exports = {
  DB_HOST: 'localhost',
  DB_USER: 'root',
  DB_PASS: '',
  DB_NAME: 'cpts',

  PORT: 8000,
  WS_PORT: 3000,

  ADMIN_PREFIX: '_?:L$"OPUIOSIFJ(*UPT:LKRFG',

  HTTP_ROOT: 'http://localhost:8000',
  //HTTP_ROOT: 'https://www.aaa.com',

  UPLOAD_DIR: path.resolve(__dirname, './static/upload'),
};