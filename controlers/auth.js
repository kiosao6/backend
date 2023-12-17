
const express = require('express')
const Usuario = require('../models/usuario')
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');


const createUser = async(request, response = express.response) => {

    console.log('Se requiere el /')
    const { email, password } = request.body
    
    try {

        let usuario = await Usuario.findOne({email})

        if(usuario) {
            return response.status(400).json({
                ok: false,
                msg: 'El usuario ya existe con ese correo'
            })
        }
        usuario = new Usuario(request.body)

        // Encriptar contraseña 

        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save()
        // Generar Json Web Token

        const token = await generarJWT(usuario.id, usuario.name)

        response.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });
    } catch (error) {
        console.log(error);
        response.status(500).json({
            ok: false,
            msg: 'Please talk to admin'
        })
    }
};

const loginUser = async(request, response = express.response) => {

    console.log('Se requiere el /')

    const { name, email, password } = request.body


    try {

        let usuario = await Usuario.findOne({email})

        // Verificar si el usuario existe con el email proporcionado

        if(!usuario) {
            return response.status(400).json({
                ok: false,
                msg: 'El usuario con ese email no existe'
            })
        }

        // Confirmar passwords de ese usuario, si es incorrecto se detiene la ejecución
        const validPassword = bcrypt.compareSync(password, usuario.password)

        if(!validPassword) {
            return response.status(400).json({
                ok: false,
                msg: 'Password Incorrecto'
            });
        };

        // Generar Json Web Token
        const token = await generarJWT(usuario.id, usuario.name);

        response.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })

    } catch (error) {
        console.log(error);
        response.status(500).json({
            ok: false,
            msg: 'Please talk to admin'
        })
    }
};

const revalidarToken = async(request, response = express.response) => {


    const uid = request.uid;
    const name = request.name;


    const token = await generarJWT(uid, name);

    response.json({
        ok: true,
        uid,
        name,
        token
    });
}

module.exports = {
    createUser,
    loginUser,
    revalidarToken
};