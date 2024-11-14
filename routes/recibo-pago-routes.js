const express = require('express');
const router = express.Router();
const { registrarRecibo, consultarRecibos } = require('../controllers/recibo-pago-controller');

// Ruta para registrar un recibo de pago
router.post('/recibos-pago', registrarRecibo);

// Ruta para consultar recibos de pago con filtros opcionales
router.get('/recibos-pago', consultarRecibos);

module.exports = router;
