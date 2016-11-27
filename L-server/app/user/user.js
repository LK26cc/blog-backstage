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
  }
}

module.exports = user;
