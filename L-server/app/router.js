var router = require('koa-router')();
var user = require('./user/user');
var department = require('./department/department');
var bodyParser = require('koa-body')();

router.get('/user/list/:currentPage',user.list);
router.get('/user/:id',user.getById);
router.post('/login',bodyParser,user.login);
router.post('/register',bodyParser,user.register);
router.post('/user/update',bodyParser,user.update);
router.get('/user/delete/:id',user.delete);
router.get('/isLogin',user.isLogin);
router.get('/department/all',department.getAll);

module.exports = router;
