const validarJWT  = require('../middlewares/validar-jwt');
const validarRoles = require('../middlewares/validar-roles');
const validarCampos = require('../middlewares/validate-fields');

module.exports = {
    ...validarJWT,
    ...validarCampos,
    ...validarRoles
}