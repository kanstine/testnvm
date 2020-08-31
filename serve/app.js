var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql')
const url = require('url');
const fs = require('fs');
var bodyParser = require('body-parser')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// 跨域（后面上线的时候需要删掉）
/* app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', "http://localhost:8088"); // 为了跨域保持session，需指定地址，不能用*
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials', true); 
  next();
})

// session
var session = require('express-session');
app.use(session({
  secret: 'classweb0731', // 设置session签名
  name: 'classweb',
  cookie: {maxAge: 60 * 1000 * 60 * 24}, // 存储时间 24 小时
  resave: false, // 每次请求都重新设置session
  saveUninitialized: true
})) */

// var Sql = require('./routes/dbhandler');
var CommonSql = require('./sql/common-sql')
var UserSql = require('./sql/user')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static('public'));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'html'))); // 启用公用文件

app.get('/login', function(req, res, next) {
  res.writeHead(200,{'Content-Type':'text/html'})
  fs.readFile('./html/index.html','utf-8',function(err,data){
      if(err){
      throw err ;
      }
      res.end(data);
      });
});

// 连接数据库
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'nvmysql'
});

db.connect((err)=> {
  if (err) {
    throw err
  }
  console.log('数据库连接成功')
});

//
app.get('/', (req, res, next)=> {

})

// 处理登录
app.post('/login', (req, res, next)=> {
  console.log('get da ze')
  console.log(req.body.username)
  CommonSql.login(db, req, res)
})

// 查询用户信息
app.post('/userPage', (req, res, next)=> {
  console.log('get da ze')
  console.log(req.body)
  UserSql.selectUser(db, req, res)
})

// 添加用户信息
app.post('/userAdd', (req, res, next)=> {
  console.log('get da ze')
  console.log(req.body)
  UserSql.addUser(db, req, res)
})

// 修改用户信息 updateUser
app.post('/userUpdate', (req, res, next)=> {
  console.log('get da ze')
  console.log(req.body)
  UserSql.updateUser(db, req, res)
})

// 删除用户信息
app.post('/userDelete', (req, res, next)=> {
  console.log('get da ze')
  console.log(req.body)
  UserSql.deleteUser(db, req, res)
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000, ()=> {
  console.log('http://localhost:3000/')
})

module.exports = app;
