const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.post('/postUser', controller.postUser);
router.get('/listUsers', controller.listUsers);
router.post('/postLogin', controller.postLogin);
router.delete('/deleteUser', controller.deleteUser);

module.exports = router;