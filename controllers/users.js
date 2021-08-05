const { response } = require('express');
const bcryptjs = require('bcryptjs')

const User = require('../models/user');

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const usersGet = async (req, res = response) => {

    const { limite = 5, desde = 0 } = req.query;

    // const users = await User.find({"state": true})
    //     .skip( Number(desde) )
    //     .limit( Number( limite) )
    
    // const total = await User.countDocuments({"state": true});

    const [ total, users ] = await Promise.all([
        User.countDocuments({"state": true}),
        User.find({"state": true})
            .skip( Number(desde) )
            .limit( Number( limite) )
    ])

    res.json({
        total,
        users
        //resp
    });
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const usersPost = async (req, res = response) => {

    const { name, email, password, role } = req.body;
    // creacion de la instancia de usuario
    const user = new User({name, email, password, role});    
    // encriptar la contraseña
    const salt = bcryptjs.genSaltSync(10);
    user.password = bcryptjs.hashSync( password, salt );
    // guardar en base de datos
    await user.save()

    res.json({
            "msg": "Post API - Controller",
            user
    });
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const usersPut = async (req, res = response) => {
    const { id } = req.params;
    // se destructura la informacion que llega del body
    const { _id, password, google, correo, ...resto } = req.body;

    // TODO validar contra base de datos
    if ( password ) {
        const salt = bcryptjs.genSaltSync(10);
        resto.password = bcryptjs.hashSync( password, salt );
    }
    console.log(id, resto);
    const user = await User.findByIdAndUpdate( id, resto );
    res.json({
        "msg": "PUT API controlador",
        user
    });
}


/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const usersPatch = (req, res = response) => {
    res.json({
        "msg": "PATCH API controlador"
    });
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const usersDelete = async (req, res = response) => {

    const { id } = req.params;

    // es es un usuario que se elimina fisicamente
    // const user = await User.findByIdAndDelete(id);

    // lectura del req que se hace desde el middlaware de JWT
    const userAuthenticathed = req.usuario;

    const userDeleted = await User.findByIdAndUpdate(id,{ state: false })
    res.json({
        id,
        userDeleted,
        userAuthenticathed
    });
}

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete
}