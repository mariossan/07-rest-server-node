const { Router } = require('express');
const { check } = require("express-validator");
const { login, googleSignIn } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.post("/login", [
    check("email", "El correo es obligatorio").isEmail(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    validateFields
],login)

router.post("/google", [
    check("id_token", "El id_token es necesario para google").not().isEmpty(),
    validateFields
],googleSignIn)


module.exports = router