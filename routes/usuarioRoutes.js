// routes/usuarioRoutes.js
const express = require('express');
const { crearUsuario, obtenerUsuarios } = require('../controllers/usuarioController');
const router = express.Router();

// Ruta para crear un usuario
router.post('/usuarios', crearUsuario);

// Ruta para obtener todos los usuarios
router.get('/usuarios', obtenerUsuarios);

module.exports = router;
