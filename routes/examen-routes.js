const express = require('express');
const router = express.Router();
const { 
    crearExamen,
    actualizarEstado,
    listarExamenes,
    consultarExamen,
    eliminarExamen,
    filtrarExamenesPorFecha,
    contarExamenesPorEstado,
    asignarExamenMasivo,
    historialExamenes,
    revisionExamenes,
    notificarCambioEstado,
} = require('../controllers/examen-controllers');

// Rutas para exámenes
router.post('/examenes', crearExamen);// listo
router.put('/examenes/:id', actualizarEstado);// listo
router.get('/examenes', listarExamenes);// listo
router.get('/examenes/revision', revisionExamenes);//
router.post('/examenes/notificar', notificarCambioEstado);// realizado
router.get('/examenes/historial', historialExamenes);// resuelto
router.get('/examenes/estadisticas', contarExamenesPorEstado);// problema resuelto
router.get('/examenes/:id', consultarExamen); // Asegúrate de que esta línea sea correcta
router.delete('/examenes/:id', eliminarExamen);// listo
router.get('/examenes/fecha', filtrarExamenesPorFecha);// listo

router.post('/examenes/masivo', asignarExamenMasivo); // lsito



module.exports = router;
