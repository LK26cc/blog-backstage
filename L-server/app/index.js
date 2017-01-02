var koa = require('koa');
var logger = require('koa-logger')
var app = koa();
var router = require('./router');
var cors = require('koa-cors');
var jwt = require('koa-jwt');
var app_secret = require('./conf').app_secret;

//resolveToken--这个方法只是获得token，不在这里面验证
function resolveToken(opts){
  if (!this.header || !this.header.token) {
    return;
  }
  var token = this.header.token;
  // var decoded = jwt.decode(token,{complete: true});//解码token
  // console.log(decoded)
  // jwt.verify(token, app_secret.secret , function(err, decoded) {//验证token
  //   // console.log(err)
  //   if(err){
  //     return err;
  //   }else{
  //     return token;
  //   }
  // });
  return token;
}
app.use(cors());//跨域
app.use(function *(next){
  try {
    yield next;
  } catch (err) {
    if (401 == err.status) {
      this.status = 200;
      this.body = {
        status:1,
        msg:'请重新登录！',
        data:{}
      };
    } else {
      throw err;
    }
  }
});
app.use(jwt({secret: app_secret.secret,getToken:resolveToken}).unless({ path: [/^\/login/,/^\/register/] }));
app.use(router.routes());
app.use(logger());//日志
app.on('error',function(err){
  console.log('--------error-----------');
  console.log(err);
  console.log('---------error----------');
})
app.listen(8000);
