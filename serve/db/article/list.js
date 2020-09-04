var db = require('../db')

// 文件夹列表
function folderList (req, res) {
  const sql = `SELECT * FROM article_folder WHERE user_id = ${req.body.userId} `
  db.query(sql, [], function (err, resdata) {
    res.setHeader('Content-Type', 'text/plain;charset=utf-8');
    if (err) {
      console.log('err')
      res.end(`{"success": "false", "code": 500, "msg": "SQL ERROR"}`)
    } else {
      const resultsData = convertToCamelCase(JSON.stringify(resdata))
      res.end(`{"success": "true", "code": 200, "data": ${resultsData}}`)
    }
  })
}

// 文件列表
function fileList (req, res) {
  console.log('请求：', req.body)
  const sql = `SELECT * FROM article_file WHERE folder_id = ${req.body.folderId} `
  console.log('sql', sql)
  db.query(sql, [], function (err, resdata) {
    res.setHeader('Content-Type', 'text/plain;charset=utf-8');
    if (err) {
      console.log('err')
      res.end(`{"success": "false", "code": 500, "msg": "SQL ERROR"}`)
    } else {
      const resultsData = convertToCamelCase(JSON.stringify(resdata))
      res.end(`{"success": "true", "code": 200, "data": ${resultsData}}`)
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
  folderList,
  fileList
};