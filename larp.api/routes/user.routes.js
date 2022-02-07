const Router = require('express');
const userController = require('../controllers/user.controller')

const router = new Router();

router.post('/users', userController.create);
router.get('/users', userController.get);
router.get('/users/:id', userController.getOne);
router.put('/users/:id', userController.update);
router.delete('/users/:id', userController.delete);


module.exports = router;