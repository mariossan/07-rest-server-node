const { Router } = require('express');
const { check } = require("express-validator");
const { login, googleSignIn } = require('../controllers/auth');
const { usersGet } = require('../controllers/categories.controller');
const { validateFields } = require('../middlewares/validate-fields');
const { route } = require('./auth');

const router = Router();

/**
 * Obtener todas las categorias - publico
 */
router.get("/", ( req, res ) => {
    res.json("get");
})

/**
 * Obtener una categoria por ID - publico
 */
 router.get("/:id", ( req, res ) => {
    res.json("get by id");
})

/**
 * Sirve para poder crear una nueva categoria - validado con un  JWT
 */
router.post("/", ( req, res ) => {
    res.json("POST");
})

/**
 * actualizar - privado - cualquier con token válido
 */
router.put("/:id", ( req, res ) => {
    res.json("PUT");
})

/**
 * Borrar una categoría - privado - Admin
 */
router.delete("/:id", ( req, res ) => {
    res.json("DELETE");
})





module.exports = router