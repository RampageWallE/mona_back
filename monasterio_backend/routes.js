const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.post('/postUser', controller.postUser);
router.get('/listUsers', controller.listUsers);

module.exports = router;