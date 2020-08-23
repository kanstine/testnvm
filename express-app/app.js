var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var mysql = require('mysql')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/get123', usersRouter)

// 连接数据库
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'nodesql'
});

db.connect((err)=> {
  if (err) {
    throw err
  }
  console.log('数据库连接成功')
});

app.get('/getuser', (req, res, next)=> {
  console.log('=====sql======')
  let sql = 'SELECT * FROM user';
  db.query(sql, (err, result)=> {
    if (err) {
      throw err
    } else {
      console.log(result);
      res.send('查询成功')
    }
  })
});

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
