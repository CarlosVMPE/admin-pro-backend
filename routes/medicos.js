/**
 * Path: '/api/medicos'
 */

const { Router } = require('express');
const { check, oneOf } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
} = require('../controllers/medicos')

const router = Router();
router.get('/', validarJWT, getMedicos);

// Crear medico
router.post('/',
    [
        validarJWT,
        check('nombre', 'El nombre del médico es necesario').not().isEmpty(),
        check('hospital', 'El hospital es necesario').not().isEmpty(),
        check('hospital', 'El hospital id debe ser válido').isMongoId(),
        validarCampos
    ]
    , crearMedico);

router.put('/:id',
    [

    ],
    actualizarMedico);

router.delete('/:id', validarJWT, borrarMedico);

module.exports = router;