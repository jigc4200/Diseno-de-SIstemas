const ReciboPago = require('../models/recibo-pago');

// Función para registrar un recibo de pago
const registrarRecibo = async (req, res) => {
  const { estudiante_id, numero_recibo, codigo_asignatura } = req.body;

  try {
    const nuevoRecibo = await ReciboPago.create({
      estudiante_id,
      numero_recibo,
      codigo_asignatura,
    });

    return res.status(201).json({
      message: 'Recibo de pago registrado exitosamente',
      recibo: nuevoRecibo,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error al registrar el recibo de pago',
      error: error.message,
    });
  }
};

// Función para consultar recibos con filtros opcionales
const consultarRecibos = async (req, res) => {
  const { estudiante_id, codigo_asignatura } = req.query;

  const condiciones = {};
  if (estudiante_id) condiciones.estudiante_id = estudiante_id;
  if (codigo_asignatura) condiciones.codigo_asignatura = codigo_asignatura;

  try {
    const recibos = await ReciboPago.findAll({
      where: condiciones,
    });

    return res.status(200).json(recibos);
  } catch (error) {
    return res.status(500).json({
      message: 'Error al obtener los recibos de pago',
      error: error.message,
    });
  }
};

module.exports = {
  registrarRecibo,
  consultarRecibos,
};
