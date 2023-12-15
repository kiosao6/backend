
/*
    Events Route
    /api/events
*/

const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEvents, createEvents, updateEvents, deleteEvents } = require('../controlers/events')
const router = Router();
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validarCampos');
const { isDate } = require('../helpers/isDate');


router.use(validarJWT);

// Obtener eventos 
router.get('/', getEvents)


// Crear un nuevo evento
router.post(
    '/',
    [
        check('title', 'El Título es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom( isDate ),
        check('end', 'Fecha de finaliazación es obligatoria').custom( isDate ),
        
        validarCampos
    ],
    createEvents),


// Actualizar evento
router.put('/:id', updateEvents)

// Eliminar evento

router.delete('/:id', deleteEvents)


module.exports = router