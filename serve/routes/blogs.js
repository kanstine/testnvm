var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');//用于req.body获取值的

var hotSql = require('../sql/blogs/hot')

router.use(bodyParser.json());
// 创建 application/x-www-form-urlencoded 编码解析
router.use(bodyParser.urlencoded({ extended: false }));

router.post('/blogsPage', function(req, res){
  console.log('req', req.body)
  const num = (req.body.pageNum - 1) * req.body.pageSize
  const sql = `SELECT * FROM article LIMIT ${num},${req.body.pageSize};`
  hotSql.articleList(sql, req, res)
});


//export this router to use in our index.js
module.exports = router;