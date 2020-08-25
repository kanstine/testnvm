const mysql = require('mysql')

// 连接数据库
/* const db = mysql.createConnection({
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
}); */

function login (db, req, res) {
  console.log('=== sql login ====')
  const sql = `SELECT * FROM user WHERE name = "${req.body.username}"`
  db.query(sql, (err, result)=> {
    if (err) {
      throw err
    } else {
      console.log('查询成功')
      var string = JSON.stringify(result); 
      var data = JSON.parse(string)
      console.log('data', data, data.length)
      res.setHeader('Content-Type', 'text/plain;charset=utf-8');
      if (data.length < 1) {
        res.end('{"success": "false", "code": 500, "msg": "用户名不存在"}');
        return
      }
      if (data[0].password == req.body.password) {
        res.end(`{"success": "true", "code": 200, "data": ${JSON.stringify(data)}}`);
      } else {
        res.end(`{"success": "false", "code": 500, "msg": "密码错误"`);
      }
      
    }
  })
}


module.exports = {
  login
}