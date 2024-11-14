// routes/clase-routes.js
const express = require('express');
const router = express.Router();
const { crearClase, listarClases, listarClasesPorFiltro, editarClase } = require('../controllers/clase-controllers');

// Ruta para crear una clase
router.post('/clases', crearClase);

// Ruta para listar todas las clases
router.get('/clases', listarClases);

// Ruta para listar clases por filtro de materia o profesor
router.get('/clases/filtro', listarClasesPorFiltro);

// ruta para editar clases por filtro
router.put('/clases/:codigo_asignatura',editarClase);

module.exports = router;
