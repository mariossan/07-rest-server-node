const { response } = require("express");
const User = require("../models/user");
const bcryptjs = require('bcryptjs');
const { generateJWT } = require("../helpers/generateJWT");
const { googleVerify } = require("../helpers/google-verify");


const login = async (req, res = response) => {

    const {email, password } = req.body;

    try {
        // verificar si el email existe
        const user = await User.findOne({ email });

        console.log(user);
        if ( !user ) {
            return res.status(400).json({
                msg: "Usuario / Password no son correctos - correo"
            })
        }

        // verificar el el usuario esta activo
        if ( !user.state ) {
            return res.status(400).json({
                msg: "Usuario / Password no son correctos - status"
            })
        }

        // verificar las contraseña
        const validPassword = bcryptjs.compareSync( password, user.password );
        if ( !validPassword ) {
            return res.status(400).json({
                msg: "Usuario / Password no son correctos - passwd"
            })
        }

        // es hora de generar el JWT
        const token = await generateJWT( user.id );

        res.json({
            'msg': "Login para el JWT",
            user,
            token
        })   

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Ocurrió un error, Hablar con el admin para poder resolverlo"
        })
    }

}

const googleSignIn = async (req, res = response) => {

    const { id_token }  = req.body;
    
    try {
        const { email, image, name }  = await googleVerify( id_token );
        let user = await User.findOne( { email } );

        if (!user) {
            // se necesita crear el usuario
            const data = {
                name,
                email,
                password: ":P",
                image,
                google: true
            }

            user = new User( data )
            user.save();
        }

        // Si el usuario tiene status false (Se niega la utenticacion)
        if( !user.state ) {
            return res.status(401).json({
                msg: "Usuario bloqueado, hable con el administrador"
            })
        }

        //generar el jwt
        const token = await generateJWT( user.id );

        res.json({
            'msg': "Todo ok con el sign in de google",
            user,
            token
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            msg: "Token de Google no reconocido"
        })
    }

}

module.exports = {
    login,
    googleSignIn
}