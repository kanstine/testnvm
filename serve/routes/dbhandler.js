// 数据库操作
const mysql = require('mysql')

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

function createSql (sql, req, res) {
  console.log('===sql select====')
  db.query(sql, (err, result)=> {
    if (err) {
      throw err
    } else {
      console.log(result)
      res.send('创建表成功')
    }
  })
}
// 执行 SQL语句，进行SQL操作
function selectSql (sql, req, res) {
  console.log('===sql select====')
  // let sql = 'SELECT * FROM user';
  db.query(sql, (err, result)=> {
    if (err) {
      throw err
    } else {
      console.log(result);
      // res.send('查询成功')
      var string = JSON.stringify(result); 
      var data = JSON.parse(string)
      console.log('data', data, data.length)
      // return JSON.parse(JSON.stringify(result))
      res.setHeader('Content-Type', 'text/plain;charset=utf-8');
      if (data.length < 1) {
        res.end('{"success": "false", "code": 500, "msg": "用户名不存在"}');
        return
      }
      if (data[0].password == req.body.password) {
        res.end('{"success": "true", "code": 200}');
      } else {
        res.end('{"success": "false", "code": 500, "msg": "密码错误"}');
      }
      
    }
  })
}

// 插入数据
function insertSql (sql, data, req, res) {
  console.log('===sql insert====')
  db.query(sql, data, (err, result)=> {
    if (err) {
      throw err
    } else {
      console.log(result);
      res.send('数据插入成功')
    }
  })
}

// 更新数据
function updateSql (sql, req, res) {
  console.log('===sql insert====')
  db.query(sql, (err, result)=> {
    if (err) {
      throw err
    } else {
      console.log(result);
      res.send('数据更新成功')
    }
  })
}

// 删除数据
function deleteSql (sql, req, res) {
  console.log('===sql insert====')
  db.query(sql, (err, result)=> {
    if (err) {
      throw err
    } else {
      console.log(result);
      res.send('数据删除成功')
    }
  })
}

/* var methodType = {
  // 项目所需
login:find,
//   type ---> 不放在服务器上面
//  放入到服务器
//  请求---> 根据传入进来的请求 数据库操作
//  req.query    req.body
show:find, //后台部分
add:add,
update:updates,
delete:deletes,
updatePwd:updates,
//portal部分
showCourse:find,
register:add
}; */
//主逻辑    服务器  ， 请求    --》 
// req.route.path ==》 防止前端的请求 直接操作你的数据库

module.exports = {
  selectSql,
  createSql,
  insertSql,
  updateSql,
  deleteSql
 }
