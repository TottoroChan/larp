const Router = require('express');
const resourceController = require('../controllers/resource.controller')

const router = new Router();

router.post('/resources', resourceController.create);
router.get('/resources', resourceController.get);
router.get('/resources/:id', resourceController.getOne);
router.put('/resources/:id', resourceController.update);
router.delete('/resources/:id', resourceController.delete);


module.exports = router;