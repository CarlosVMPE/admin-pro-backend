/**
 * Path: '/api/uploads'
 */
const { Router } = require('express');
const ExpfileUpload = require('express-fileupload');
const { fileUpload, retornaImagen } = require('../controllers/upload');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();
router.use(ExpfileUpload());

router.put('/:tipo/:id', validarJWT , fileUpload);
router.get('/:tipo/:foto', retornaImagen);

module.exports = router;