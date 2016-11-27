var db_models = require('../init');
var user_service = db_models.User;
var user = {
  list:function *(){
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
  },
  getById:function *(id){
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
  },
  login:function *(){
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
  },
  register:function *(){
    var name = this.request.body.name,
        password = this.request.body.password;
    var row = yield user_service.create({
      'name':name,
      'password':password
    });
    if(row){
      this.body = {
        status:0,
        msg:'操作成功！',
        data:{}
      };
    }else{//null
       this.body = {
         status:-1,
         msg:'操作失败！',
         data:{}
       };
     }
  }
}

module.exports = user;
