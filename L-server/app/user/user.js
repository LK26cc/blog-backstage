var db_models = require('../init');
var user_service = db_models.User;
var jwt = require('koa-jwt');
var app_secret = require('../conf').app_secret;
var user = {
  list:function *(next){
    var rows = yield user_service.findAll();//返回数组
    if(rows.length===0){
      this.body = {
        status:0,
        msg:'没有查到相关数据',
        data:{}
      };
    }else{
      this.body = {
        status:0,
        msg:'',
        data:rows
      };
    }
    yield next;
  },
  getById:function *(next){
    var row = yield user_service.findById(this.params.id);
    if(row){
       this.body = {
         status:0,
         msg:'',
         data:row.dataValues
       };
     }else{//null
       this.body = {
         status:0,
         msg:'没有查到相关数据',
         data:{}
       };
     }
     yield next;
  },
  login:function *(next){
    var name = this.request.body.name,
        password = this.request.body.password;
    var row = yield user_service.findOne({
      'where': {
        'name': name,
        'password':password
      }
    });
    if(row){
       this.body = {
         status:0,
         msg:'登录成功！',
         token:jwt.sign(row.dataValues, app_secret.secret , {expiresIn: 3600}),//秒
         data:row.dataValues
       };
     }else{//null
       this.body = {
         status:-1,
         msg:'登录失败！',
         data:{}
       };
     }
     yield next;
  },
  register:function *(next){
    var name = this.request.body.name,
        password = this.request.body.password;
    var row = yield user_service.create({
      'name':name,
      'password':password
    });
    if(row){
      this.body = {
        status:0,
        msg:'注册成功！',
        data:{}
      };
    }else{//null
       this.body = {
         status:-1,
         msg:'注册失败！',
         data:{}
       };
     }
     yield next;
  },
  update:function *(next){
    var id = this.request.body.id,
        name = this.request.body.name,
        department = this.request.body.department;
    var fields = [];
    for(var param in this.request.body){
      if(param!=='id' && this.request.body[param]){
        fields.push(param);
      }
    };
    var row = yield user_service.update({
      'name':name,
      'department':department
    },{
      'fields':fields,
      'where': {
        'id':id
      }
    });
    //返回数组，数组中的值表示影响的记录行数
    if(row.length>0 && row[0]===1){
      this.body = {
        status:0,
        msg:'操作成功！',
        data:{}
      };
    }else{
      this.body = {
        status:-1,
        msg:'操作失败！',
        data:{}
      };
    }
    yield next;
  },
  delete:function *(next){
    var row = yield user_service.destroy({
      'where':{
        'id':this.params.id
      }
    });
    if(row===1){
      this.body = {
        status:0,
        msg:'操作成功！',
        data:{}
      };
    }else{
      this.body = {
        status:-1,
        msg:'操作失败！',
        data:{}
      };
    }
    yield next;
  },
  isLogin:function *(next){
    this.body = {
      status:0,
      msg:'操作成功！',
      data:{}
    };
    yield next;
  }
}

module.exports = user;
