const mysql = require('mysql')

function selectUser (db, req, res) {
  console.log('=== sql select ====')
  const num = (req.body.pageNum - 1) * req.body.pageSize
  const sql = `SELECT * FROM user LIMIT ${num},${req.body.pageSize};`
  let zum = 0
  db.query('SELECT COUNT(*) FROM user', (err, result) => {
    if (err) {
      throw err
    } else {
      zum = JSON.parse(JSON.stringify(result))[0]['COUNT(*)']
    }
  })
  db.query(sql, (err, result)=> {
    if (err) {
      throw err
    } else {
      console.log('查询成功')
      console.log(result)
      const data = JSON.parse(JSON.stringify(result))
      console.log('data', data)
      res.setHeader('Content-Type', 'text/plain;charset=utf-8')
      if (data.length < 1) {
        res.end('{"success": "false", "code": 500, "msg": "查询失败"}')
        return
      } else {
        res.end(`{"success": "true", "code": 200, "data": ${JSON.stringify(data)}}`)
      }
    }
  })
}

function addUser (db, req, res) {
  console.log('=== sql add ====')
  console.log(req.body)
  res.setHeader('Content-Type', 'text/plain;charset=utf-8');
  const sql = 'INSERT INTO user SET ?'
  db.query(sql, req.body, (err, result)=> {
    if (err) {
      throw err
    } else {
      res.end(`{"success": "true", "code": 200, "msg": "添加成功"}`)
    }
  })
}

function updateUser (db, req, res) {
  console.log('=== sql update ====')
  console.log(req.body)
  res.setHeader('Content-Type', 'text/plain;charset=utf-8');
  const sql = `UPDATE user SET name = "${req.body.name}", type = ${req.body.type} WHERE id = ${req.body.id}`
  db.query(sql, (err, result)=> {
    if (err) {
      throw err
    } else {
      res.end(`{"success": "true", "code": 200, "msg": "更新成功"}`)
    }
  })
}

function deleteUser (db, req, res) {
  console.log('=== sql deldete ====')
  res.setHeader('Content-Type', 'text/plain;charset=utf-8');
  const sql = `DELETE FROM user WHERE id = ${req.body.id}`
  db.query(sql, (err, result)=> {
    if (err) {
      throw err
    } else {
      res.end(`{"success": "true", "code": 200, "msg": "删除成功"}`)
    }
  })
}


module.exports = {
  selectUser,
  addUser,
  updateUser,
  deleteUser
 }