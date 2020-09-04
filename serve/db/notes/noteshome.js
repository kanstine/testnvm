var db = require('../db')

var NotesSql = {
  insert : 'INSERT INTO User(id, userName, password) VALUES(?,?,?) ',
  query : 'SELECT * FROM notes ',
  getUserById: 'SELECT * FROM user WHERE uid = ? '
};

function selectNotePage (req, res) {
  var results = {};
  const sql = 'SELECT * FROM notes'
  db.query(sql, [], function (err, resdata) {
    results = resdata
    res.setHeader('Content-Type', 'text/plain;charset=utf-8');
    res.end(`{"success": "true", "code": 200, "data": ${JSON.stringify(results)}}`)
  })
}

// 查询笔记信息
function selectNotes (req, res) {
  var results = {};
  console.log('请求：', req.body)
  const sql = 'SELECT * FROM notes'
  db.query(sql, [], function (err, resdata) {
    results = resdata
    res.setHeader('Content-Type', 'text/plain;charset=utf-8');
    res.end(`{"success": "true", "code": 200, "data": ${JSON.stringify(results)}}`)
  })
}

// 查询块信息
function selectBlock (req, res) {
  console.log('请求：', req.body)
  const sql = `SELECT * FROM notes_block WHERE nid = ${req.body.nid}`
  db.query(sql, [], function(err, resdata) {
    res.setHeader('Content-Type', 'text/plain;charset=utf-8');
    if (err) {
      res.end(`{"success": "false", "code": 500, "msg": "SQL ERROR"}`)
      return
    }
    for(let i = 0; i < resdata.length; i++) {
      const sqlr = `SELECT * FROM notes_row WHERE block_id = ${resdata[i].block_id}`
      db.query(sqlr, [], function(err, rowdata) {
        resdata[i].rowList = rowdata
        if (i === resdata.length - 1) {
          const resultsData = convertToCamelCase(JSON.stringify(resdata))
          res.end(`{"success": "true", "code": 200, "data": ${resultsData}}`)
        }
      })
    }

  })
}

// 新增note
function addNotes (req, res) {
  const sql = `INSERT INTO notes (title, type, synopsis) VALUES ("${req.body.title}", "${req.body.type}", "${req.body.synopsis}")`
  db.query(sql, [], function(err, resdata) {
    res.setHeader('Content-Type', 'text/plain;charset=utf-8');
    if (err) {
      console.log('err')
      res.end(`{"success": "false", "code": 500, "msg": "SQL ERROR"}`)
    } else {
      res.end(`{"success": "true", "code": 200, "data": ${resdata.insertId}}`)
    }
  })
}

// 新增block
function addBlock (req, res) {
  console.log('b请求：', req.body[0].nid)
   // const sql = `INSERT INTO notes (title, type, synopsis) VALUES ("${req.body.title}", "${req.body.type}", "${req.body.synopsis}")`
  let sql = ''
  for (let i = 0; i <  req.body.length; i++) {
    // 添加块
    sql = sql + `INSERT INTO notes_block (nid, title) VALUES (${req.body[i].nid}, "${req.body[i].title}");`
  }
  console.log('===', sql)
  db.query(sql, [], function(err, resdata) {
    res.setHeader('Content-Type', 'text/plain;charset=utf-8');
    if (err) {
      console.log('err')
      res.end(`{"success": "false", "code": 500, "msg": "SQL ERROR"}`)
    } else {
      const OkPacket = JSON.parse(JSON.stringify(resdata))
      let sqlRow = ''
      // 添加行
      for (let m = 0; m < OkPacket.length; m++) {
        for (let n = 0; n < req.body[m].rowList.length; n++) {
          sqlRow = sqlRow + `INSERT INTO notes_row (type, row_text, block_id) VALUES ("${req.body[m].rowList[n].type || null}", "${req.body[m].rowList[n].text || null}" ,${OkPacket[m].insertId});`
        }
      }
      db.query(sqlRow, [], function(err, resRow) {
        if (err) {
          console.log('err')
          res.end(`{"success": "false", "code": 500, "msg": "SQL ERROR"}`)
        } else {
          res.end(`{"success": "true", "code": 200, "msg": "添加成功"}`)
        }
      })
    }
  })
}


// 将数据库 下划线类型字段名称 改为驼峰命名
function convertToCamelCase(str) {
  // 去除中划线分隔符获取单词数组
  var strArr = str.split('_');
  // 如果第一个为空，则去掉
  if(strArr[0] === '') {
    strArr.shift();
  } 
  // 遍历第二个单词到最后一个单词，并转换单词首字母为答谢
  for(var i = 1, len = strArr.length; i < len; i++){
    // 如果不为空，则转成大写
    if(strArr[i] !== '') {
       strArr[i] = strArr[i][0].toUpperCase() + strArr[i].substring(1);
    }   
  }
  return strArr.join('');
}

module.exports = {
  NotesSql,
  selectNotePage,
  selectNotes,
  selectBlock,
  addNotes,
  addBlock
};