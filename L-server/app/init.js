var db_op = require('./conf').db_optiions;
var Sequelize = require('sequelize');
var sequelize = new Sequelize(
    db_op.db_name, // 数据库名
    db_op.username,   // 用户名
    db_op.password,   // 用户密码
    {
        'dialect': 'mysql',  // 数据库使用mysql
        'host': db_op.host, // 数据库服务器ip
        'port': db_op.port,        // 数据库服务器端口
        'define': {
            // 字段以下划线（_）来分割（默认是驼峰命名风格）
            'underscored': true
        }
    }
);

var User = sequelize.define(
  'user',
  {
    'name':{
      'type':Sequelize.CHAR(10),
      'allowNull':false,
      'unique': true
    },
    'password':{
      'type':Sequelize.CHAR(10),
      'allowNull':false,
    },
    'department': {
      'type': Sequelize.INTEGER(),
      'allowNull': true
    }
  }
);

exports.User = User;
