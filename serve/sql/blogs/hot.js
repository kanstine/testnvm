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

function articleList (sql, req, res) {
  let num = 0
  db.query('SELECT COUNT(*) FROM article', (err, result) => {
    if (err) {
      throw err
    } else {
      const zum = JSON.parse(JSON.stringify(result))
      console.log('num', zum[0]['COUNT(*)'])
      num = zum[0]['COUNT(*)']
      db.query(sql, (err, result) => {
        if (err) {
          throw err
        } else {
          const list = JSON.parse(JSON.stringify(result))
          console.log('list', list)
          const data = {
            list: list,
            total: num
          }
          res.setHeader('Content-Type', 'text/plain;charset=utf-8')
          if (list.length < 1) {
            res.end('{"success": "false", "code": 500, "msg": "无结果"}')
            return
          } else {
            res.end(`{"success": "true", "code": 200, "data": ${JSON.stringify(data)}}`)
          }
        }
      })
    }
  })
}

module.exports = {
  articleList
 }