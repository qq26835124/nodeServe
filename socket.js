const http = require('http')
const querystring = require('querystring')

const handleResult = (results) => {
  let data = {
    msgType: 'robot',
    uid: 'robot',
    nickname: '机器人',
    createTime: new Date().getTime()
  };
  data.msgType = 'robot';
  data.msg = '';
  results.forEach(item => {
    if (item.resultType == 'text') {
      data.msg += `<p>${item.values.text}</p>`
    } else if (item.resultType == 'url') {
      data.msg += `<p><a href="${item.values.url}">链接</a></p>`
    } else if (item.resultType == 'voice') {
      data.msg += `<p><audio src="${item.values.url}"></audio></p>`
    } else if (item.resultType == 'video') {
      data.msg += `<p><video src="${item.values.url}"></video></p>`
    } else if (item.resultType == 'image') {
      data.msg += `<p><img src="${item.values.url}" /></p>`;
    } else if (item.resultType == 'news') {
      data.msg += `<p>${item.values.text}</p>`;
    }
  });
  return data;

}

module.exports = config => {
  const io = require('socket.io').listen(config.WS_PORT);

  io.on('connection', socket => {
    socket.emit('news', {
      hello: 'world'
    });

    socket.on('client1Msg', data => {
      console.log('来自客户端1的数据：', data);
      socket.broadcast.emit('client1Msg', data);
    });

    socket.on('client2Msg', data => {
      console.log('来自客户端2的数据：', data);
      socket.broadcast.emit('client2Msg', data);
    })

    socket.on('chatMsg', data => {
      socket.broadcast.emit('chatMsg', data);
    })

    socket.on('robot', data => {
      const postData = JSON.stringify({
        "reqType": 0,
        "perception": {
          "inputText": {
            "text": data.msg
          },
          "inputImage": {
            "url": "imageUrl"
          },
          "selfInfo": {
            "location": {
              "city": data.city,
              "province": data.province,
              "street": data.street
            }
          }
        },
        "userInfo": {
          "apiKey": "3d270531abe64cdca466afd1db254592",
          "userId": "532896"
        }
      });
      console.log(postData)
      const options = {
        port: 80,
        host: 'openapi.tuling123.com',
        path: '/openapi/api/v2',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      };
      const req = http.request(options, res => {
        res.setEncoding('utf8');
        res.on('data', chunk => {
          console.log(`响应主体: ${chunk}`);
          let obj = JSON.parse(chunk);
          if (obj.results) {
            let data = handleResult(obj.results);
            socket.emit('robot', data);
          }
        });
        res.on('end', () => {
          console.log('响应中已无数据');
        });

      })
      req.on('error', (e) => {
        console.error(`请求遇到问题: ${e.message}`);
      });

      // 将数据写入请求主体。
      req.write(postData);
      req.end();
    })

    socket.on('message', msg => {
      console.log('message:', msg);
    })

    socket.on('disconnect', () => {

    })
  })
}