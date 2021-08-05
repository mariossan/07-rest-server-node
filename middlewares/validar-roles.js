const { response } = require("express")


const isAdmin = (req, res = response, next) => {

    if ( !req.usuario ) {
        return res.status(500).json({
            msg: "Se quiere verificar el role sin validar el token primero"
        })
    }
    const {role, name} = req.usuario;

    if ( role !== "ADMIN_ROLE" ) {
        return res.status(401).json({
            msg: `${ name } no es admin y no puede ejecutar la instrcuccion`
        })
    }

    next();
}

const hasRole = ( ...roles ) => {
    return (req, res = response, next) => {

        if ( !req.usuario ) {
            return res.status(500).json({
                msg: "Se quiere verificar el role sin validar el token primero"
            })
        }

        if ( !roles.includes( req.usuario.role ) ) {
            return res.status(401).json({
                msg: "El servicio requiere un role válido"
            })
        }
        
        next()
    }
}


module.exports = {
    isAdmin,
    hasRole
}