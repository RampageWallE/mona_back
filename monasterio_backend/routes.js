const express = require('express');
const router = express.Router();
const controller = require('./controller');
const middleware = require('./middlewares/middleware')

router.post('/postUser', controller.postUser);
router.get('/listUsers', controller.listUsers);
router.post('/postLogin', controller.postLogin);
router.delete('/deleteUser', controller.deleteUser);

router.get('/ruta-protegida', middleware.verificarToken, (req, res) => {
    res.status(200).json({
        message: "Accediste a una ruta protegida",
        usuario: req.user // Información extraída del token
    });
});



module.exports = router;