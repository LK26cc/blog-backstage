var koa = require('koa');
var logger = require('koa-logger')
var app = koa();
var router = require('./router');
var cors = require('koa-cors');

app.use(cors());
app.use(router.routes());
app.use(logger());//日志
app.listen(8000);
