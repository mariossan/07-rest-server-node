const Role = require("../models/role")
const User = require('../models/user');

const isRoleValid = async ( role = "") => {
    const existsRole = await Role.findOne({ role });
    if ( !existsRole ) {
        throw new Error("El rol no esta registrado en base de datos")
    }
};

const exitsEmail = async (email = "") => {
    const emailRepeated = await User.findOne({ email })
    if ( emailRepeated ) {
        throw new Error("El correo ya esta registrado")
    }
}

const exitsUserById = async (id = "") => {
    const existsUser = await User.findById(id)
    if ( !existsUser ) {
        throw new Error("El ID no existe")
    }
}


module.exports = {
    isRoleValid,
    exitsEmail,
    exitsUserById
}