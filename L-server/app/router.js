var router = require('koa-router')();
var pets = require('./pets/pets');
var user = require('./user/user');

router.get('/pets', pets.list);
router.get('/pets/:name', pets.show);
router.get('/user',user.list);
router.get('/user/:id',user.getById);
module.exports = router;
