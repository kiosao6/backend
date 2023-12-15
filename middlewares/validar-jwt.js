
const { response } = require('express')
const jwt = require('jsonwebtoken');


const validarJWT = (req, res = response, next) => {

    // X-TOKEN-HEADERS

    const token = req.header('x-token');

    if(!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay Token en la petición'
        });
    }

    try {

        const payload = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );

        req.uid = payload.uid;
        req.name = payload.name

        console.log(payload)

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        })
    }

    console.log(token)


    next()

}

module.exports = {
    validarJWT
}