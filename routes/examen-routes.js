const express = require('express');
const router = express.Router();
const { crearExamen, actualizarEstado, listarExamenes } = require('../controllers/examen-controllers');

// Ruta para crear un examen
router.post('/examenes', crearExamen);

// Ruta para actualizar el estado del examen
router.put('/examenes/:id/estado', actualizarEstado);

// Ruta para listar todos los exámenes
router.get('/examenes', listarExamenes);

module.exports = router;
