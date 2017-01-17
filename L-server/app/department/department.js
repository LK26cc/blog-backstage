var db_models = require('../init');
var dep_service = db_models.Department;
var department = {
  getAll:function *(next){
    var result = yield dep_service.findAll();//返回数组
    if(result.length===0){
      this.body = {
        status:0,
        msg:'没有查到相关数据',
        data:{}
      };
    }else{
      this.body = {
        status:0,
        msg:'',
        data:result
      };
    }
    yield next;
  }
};
module.exports = department;
