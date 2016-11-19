var options = {
  'host':'127.0.0.1',
  'port':'3306',
  'database': 'db_test',
  'user':'root',
  'password':'900213',
  'connectionLimit':10,//连接池中最大创建链接数量
  'queueLimit':0//链接请求池排队最大数量在返回错误之前，默认为0不显示请求链接数量
};
var mysql = require('mysql');
var pool = mysql.createPool(options);
//内部对mysql的封装，执行sql语句
function execQuery(sql, values, callback) {
    var errinfo;
    pool.getConnection(function(err, connection) {
        if (err) {
            errinfo = 'DB-获取数据库连接异常！';
            throw errinfo;
        } else {
            var querys = connection.query(sql, values, function(err, rows) {
                release(connection);
                if (err) {
                    errinfo = 'DB-SQL语句执行错误:' + err;
                    callback(err);
                } else {
                    callback(null,rows);//注意：第一个参数必须为null
                }
            });
        }
    });
}

function release(connection) {
    try {
        connection.release(function(error) {
            if (error) {
                console.log('DB-关闭数据库连接异常！');
            }
        });
    } catch (err) {}
}
//对外接口返回Promise函数形式
var userDB = {
  getById:function (tablename, id){
      return new Promise(function(resolve, reject){
          var values = {id:id};
          var sql = 'select * from ?? where ?';
          execQuery(sql,[tablename, values], function(err, rows){
              if(err){
                  reject(err);
              }else{
                  resolve(rows);
              }
          })
      });
  }
}
module.exports = userDB;
