const { response, request } = require("express")
const jwt = require("jsonwebtoken")
const User = require("../models/user")

const validarJWT = async (req = request, res = response, next) => {
    const token = req.header("x-token")

    if ( !token ) {
        return res.status(401).json({
            msg: "No hay token en la peticion"
        })
    }

    try {

        const { uid } = jwt.verify( token, process.env.SECRET_PRIVATE_KEY );
        // leer el usuario que corresponde al UID
        const user = await User.findById({ _id: uid });

        if ( !user ) {
            return res.status(401).json({
                msg: "Token no valido, el usuario no exixte en base de datos"
            })
        }

        // verificar que el state esta marcado en true y puede continuart
        if ( !user.state ) {
            return res.status(401).json({
                msg: "Token no valido, state = 0"
            })
        }

        req.usuario = user;

        next()
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: "Token no valido"
        })
    }
}

module.exports = {
    validarJWT
}