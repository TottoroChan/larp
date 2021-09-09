const { response } = require('express');
const Router = require('express');
const userController = require('../controllers/user.controller')

const router = new Router();

router.post('/users', userController.create);
router.get('/users', userController.get);
router.get('/users/:id', userController.getOne);
router.post('/users', userController.update);
router.post('/users/:id', userController.remove);


module.exports = router;