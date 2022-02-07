const Router = require('express');
const characterController = require('../controllers/character.controller')

const router = new Router();

router.post('/characters', characterController.create);
router.get('/characters', characterController.get);
router.get('/characters/:id', characterController.getOne);
router.put('/characters/:id', characterController.update);
router.put('/characters/resource/:id', characterController.updateResource);
router.delete('/characters/:id', characterController.delete);


module.exports = router;