var router = require('koa-router')();
var pets = require('./pets/pets');
var user = require('./user/user');

router.get('/pets', pets.list);
router.get('/pets/:name', pets.show);
router.get('/user',user.list);

module.exports = router;
