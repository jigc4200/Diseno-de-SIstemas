// routes/usuarioRoutes.js
const express = require('express');
const { crearUsuario, 
        obtenerUsuarios,
        consultarUsuario,
        actualizarUsuario,
        eliminarUsuario,
        restablecerPassword,


 } = require('../controllers/usuarioController');
const router = express.Router();

// Ruta para crear un usuario
router.post('/usuarios', crearUsuario);

// Ruta para obtener todos los usuarios
router.get('/usuarios', obtenerUsuarios);

// Ruta para consultar usuarios por email,id,cedula
router.get('/consultar',consultarUsuario);

// Ruta para actualizar usuario
router.put('/actualizar', actualizarUsuario);

// Ruta para eliminar por cedula, solo sino tiene examenes
router.delete('/eliminar/:cedula',eliminarUsuario);

//restablecer contrasena 
router.put('/usuarios/restablecer-password/:cedula', restablecerPassword);

module.exports = router;
