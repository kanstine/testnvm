var express = require('express');
var path = require('path');
var app = express();

var notes = require('./routes/notes')
app.use('/notes', notes)

var article = require('./routes/article')
app.use('/article', article)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');






// 错误处理 位于末尾拦截所有其他地址
app.get('*', function(req, res){
  res.send('Sorry, this is an invalid URL.');
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler 错误处理
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