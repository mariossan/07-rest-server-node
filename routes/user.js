const { Router } = require('express');
const { check } = require("express-validator")
const { usersGet, usersPost, usersPut, usersDelete, usersPatch } = require('../controllers/users');
const { isRoleValid, exitsEmail, exitsUserById } = require('../helpers/db-validators');

// const { validarJWT } = require('../middlewares/validar-jwt');
// const { isAdmin, hasRole } = require('../middlewares/validar-roles');
// const { validateFields } = require('../middlewares/validate-fields');

const { validarJWT, isAdmin, hasRole, validateFields } = require("../middlewares")

const router = Router();

router.get("/", usersGet )
router.post("/", [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe ser mayor a 6 letras").isLength({min:6}),
    check("email", "El correo no es válido").isEmail(),
    // check("role", "No es un rol permitido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check("role").custom( isRoleValid ),
    check("email").custom( exitsEmail ),
    validateFields
] ,usersPost )

router.put("/:id",[
    check("id", "NO es un id valido").isMongoId(),
    check("id").custom( exitsUserById ),
    check("role").custom( isRoleValid ),
    validateFields
],usersPut )

router.patch("/", usersPatch )

router.delete("/:id", [
    validarJWT,
    // isAdmin,
    hasRole( "ADMIN_ROLE", "VENTAS_ROLE" ),
    check("id", "NO es un id valido").isMongoId(),
    check("id").custom( exitsUserById ),
] ,usersDelete )

module.exports = router