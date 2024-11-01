const express = require('express');
const { registrarAccion,consultarAuditoria } = require('../controllers/auditoriaController');
const router = express.Router();

// Ruta para registrar acción en la auditoría
router.post('/auditoria', registrarAccion);
router.get('/auditoria', consultarAuditoria);

module.exports = router;
