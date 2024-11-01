const express = require('express');
const { crearMateria, listarMaterias, asignarProfesorAMateria } = require('../controllers/materia-controllers');

const router = express.Router();

// Crear materia
router.post('/materias', crearMateria);

// Listar materias
router.get('/materias', listarMaterias);

// Asignar profesor a materia
router.put('/materias/:codigo_asignatura/profesor', asignarProfesorAMateria);

module.exports = router;
