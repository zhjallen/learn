require('babel-register')

const webpack = require('webpack');

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const config = require('./webpack.config');

const isProduction = process.env.NODE_ENV === 'production';
const isDeveloping = !isProduction;

const app = express();

// Webpack developer
if (isDeveloping) {
  const compiler = webpack(config);
  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath,
    noInfo: true
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}

//  RESTful API
const publicPath = path.resolve(__dirname);
app.use(bodyParser.json({ type: 'application/json' }))
app.use(express.static(publicPath));

const port = isProduction ? (process.env.PORT || 80) : 9001;

// this is necessary to handle URL correctly since client uses Browser History
app.get('*', function (req, res){
  res.sendFile(path.resolve(__dirname, '', 'index.html'))
})

app.put('/api/auth/login', function(req, res) {
  const credentials = req.body;
  if(credentials.user==='admin' && credentials.password==='123456'){
    res.json({
      'user':{
        'username': credentials.user,
        'role': 'ADMIN', 
      },      
      'token': 1});
  }else{
    res.status('500').send({'message' : '用户名密码错误'});
  }
});

app.post('/api/menu', function(req, res) {
  res.json({
    menus: [
      {
        key: 1,
        name: 'Dashboard',
        icon: 'user',
        child: [
          {
            name: '选项1',
            key: 101
          },
          {
            name: '选项2',
            key: 102
          },
          {
            name: '选项3',
            key: 103
          },
          {
            name: '选项4',
            key: 104
          }
        ]
      },
      {
        key: 2,
        name: '导航二',
        icon: 'laptop',
        child: [
          {
            name: '选项5',
            key: 201
          },
          {
            name: '选项2',
            key: 202
          },
          {
            name: '选项3',
            key: 203
          },
          {
            name: '选项4',
            key: 204
          }
        ]
      },
      {
        key: 3,
        name: '导航三',
        icon: 'notification',
        child: [
          {
            name: '选项1',
            key: 301
          },
          {
            name: '选项2',
            key: 302
          },
          {
            name: '选项3',
            key: 303
          },
          {
            name: '选项4',
            key: 304
          }
        ]
      },
      {
        key: 4,
        name: 'my导航',
        icon: 'notification',
        child: [
          {
            name: '选项11',
            key: 401
          },
          {
            name: '选项12',
            key: 402
          },
          {
            name: '选项13',
            key: 403
          },
          {
            name: '选项14',
            key: 404
          }
        ]
      }
    ]
  });
});

app.post('/api/my', function(req, res) {
  res.json({'user': 'admin', 'role': 'ADMIN', 'uid': 1});
});

app.post('/api/logout', function(req, res) {
  res.clearCookie('tokenId');
  res.json({'user': 'admin', 'role': 'ADMIN'});
});

app.listen(port, function (err, result) {
  if(err){
    console.log(err);
  }
  console.log('Server running on port ' + port);
});