// 路径处理
var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');//用于req.body获取值的
router.use(bodyParser.json());
// 创建 application/x-www-form-urlencoded 编码解析
router.use(bodyParser.urlencoded({ extended: false }));

var artListSql = require('../db/article/list');

router.post('/folderList', function(req, res) {
  artListSql.folderList(req, res)
})

router.post('/fileList', function(req, res) {
  artListSql.fileList(req, res)
})


module.exports = router;