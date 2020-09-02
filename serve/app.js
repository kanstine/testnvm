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

// var Sql = require('./routes/dbhandler');
var CommonSql = require('./sql/common-sql')
var UserSql = require('./sql/user')

var db2 = require('./db/db'); //引入db
var userSql = require('./db/notes/noteshome');

app.get("/getAllUsers", function (req, res, next) {
    var results = {};
    db2.query(userSql.query, [], function (err, rows) {
        results = rows;
        console.log("results: " + results.str);
        res.send(results);
    });
});


var blogs = require('./routes/blogs')
app.use('/blogs', blogs)

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
