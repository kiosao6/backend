
const {Router} = require('express');
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validarCampos')
const router = Router(); 
const { validarJWT } = require('../middlewares/validar-jwt')

const { createUser, loginUser, revalidarToken } = require('../controlers/auth')

router.post(
    '/new',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe ser de 6 caracteres').isLength({min: 6}),
        validarCampos

    ],
    createUser);

router.post(
    '/', 
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe ser de 6 caracteres').isLength({min: 6}),
        validarCampos
    ],
    loginUser);


router.get('/renew', validarJWT ,revalidarToken);

module.exports = router;