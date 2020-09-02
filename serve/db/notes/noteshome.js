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
    console.log("results: " + results.str)
    res.end(`{"success": "true", "code": 200, "data": ${JSON.stringify(results)}}`)
  })
}

function addNotes (req, res) {
  var results = {};
  console.log('请求：', req.body)
  const sql = 'SELECT * FROM notes'
  db.query(sql, [], function (err, resdata) {
    results = resdata
    console.log("results: " + results.str)
    res.end(`{"success": "true", "code": 200, "data": ${JSON.stringify(results)}}`)
  })
}

module.exports = {
  NotesSql,
  selectNotePage,
  addNotes
};