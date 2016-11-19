var koa = require('koa');
var app = koa();
var router = require('./router');

app.use(router.routes());

app.listen(8000);
