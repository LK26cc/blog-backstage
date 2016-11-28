var router = require('koa-router')();
var user = require('./user/user');
var bodyParser = require('koa-body')();

router.get('/user',user.list);
router.get('/user/:id',user.getById);
router.post('/login',bodyParser,user.login);
router.post('/register',bodyParser,user.register);
router.post('/user/update',bodyParser,user.update);
router.get('/user/delete/:id',user.delete);

module.exports = router;
