/**
 * Created by wjw on 2018/10/13.
 */
//db.js
// connect mySql
var mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'nvmysql'

});

function  query(sql, values, callback) {
    console.log("db pool 数据库操作");
    pool.getConnection(function (err, connection) {
        if(err) throw err;
        console.log("get connection ");
        //Use the connection
        connection.query(sql, values,function (err, results, fields) {
            console.log(JSON.stringify(results));
            //每次查询都会 回调
            callback(err, results);
            //只是释放链接，在缓冲池了，没有被销毁
            connection.release();
            if(err) throw error;

        });

    });
}

exports.query = query;