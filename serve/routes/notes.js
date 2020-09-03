// 路径处理
var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');//用于req.body获取值的
router.use(bodyParser.json());
// 创建 application/x-www-form-urlencoded 编码解析
router.use(bodyParser.urlencoded({ extended: false }));

var notesSql = require('../db/notes/noteshome');


router.post('/notesPage',  function(req, res){
  console.log('请求：', req.body)
  notesSql.selectNotePage(req, res)
})

router.post('/noteAdd', function(req, res) {
  notesSql.selectNotes(req, res)
})

router.post('/noteBlockPage', function(req, res) {
  notesSql.selectBlock(req, res)
})

router.post('/notesAdd', function(req, res) {
  notesSql.addNotes(req, res)
})

router.post('/blockAdd', function(req, res) {
  notesSql.addBlock(req, res)
})


module.exports = router;