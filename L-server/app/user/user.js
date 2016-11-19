var db_user = require('./userDB');
var user = {
  list:function *(){
    var rows = yield db_user.getById('dt_test', 1);
    this.body = rows[0];
  }
}

module.exports = user;
