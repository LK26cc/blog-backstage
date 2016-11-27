var router = require('koa-router')();
var pets = require('./pets/pets');
var user = require('./user/user');
var bodyParser = require('koa-body')();

router.get('/pets', pets.list);
router.get('/pets/:name', pets.show);
router.get('/user',user.list);
router.post('/login',bodyParser,user.login);
router.post('/register',bodyParser,user.register);

module.exports = router;
