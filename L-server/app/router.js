var router = require('koa-router')();
var pets = require('./pets/pets');
router.get('/pets', pets.list);
router.get('/pets/:name', pets.show);

module.exports = router
