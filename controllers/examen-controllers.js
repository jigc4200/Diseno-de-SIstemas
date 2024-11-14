const { Op } = require('sequelize');
const  Examen = require('../models/examen');

// Función para crear un examen
const crearExamen = async (req, res) => {
  const { estudiante_id, codigo_asignatura, tipo, estado } = req.body;

  try {
    const nuevoExamen = await Examen.create({
      estudiante_id,
      codigo_asignatura,
      tipo,
      estado,
    });

    return res.status(201).json({
      message: 'Examen creado exitosamente',
      examen: nuevoExamen,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error al crear el examen',
      error: error.message,
    });
  }
};

// Función para actualizar el estado de un examen
const actualizarEstado = async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  try {
    const examen = await Examen.findByPk(id);

    if (!examen) {
      return res.status(404).json({ message: 'Examen no encontrado' });
    }

    examen.estado = estado;
    await examen.save();

    return res.status(200).json({
      message: 'Estado del examen actualizado exitosamente',
      examen,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error al actualizar el estado del examen',
      error: error.message,
    });
  }
};

// Función para listar todos los exámenes // deprecated 
/*
const listarExamenes = async (req, res) => {
  try {
    const examenes = await Examen.findAll();

    return res.status(200).json(examenes);
  } catch (error) {
    return res.status(500).json({
      message: 'Error al obtener los exámenes',
      error: error.message,
    });
  }
};
*/
const listarExamenes = async (req, res) => {
  const { estado, estudiante_id, tipo, codigo_asignatura } = req.query; // Extrae los filtros de la consulta

  try {
    // Construye el objeto de condiciones dinámicamente
    const filtros = {};
    if (estado) filtros.estado = estado;
    if (estudiante_id) filtros.estudiante_id = estudiante_id;
    if (tipo) filtros.tipo = tipo;
    if (codigo_asignatura) filtros.codigo_asignatura = codigo_asignatura;

    // Ejecuta la consulta con los filtros
    const examenes = await Examen.findAll({ where: filtros });

    return res.status(200).json(examenes);
  } catch (error) {
    return res.status(500).json({
      message: 'Error al obtener los exámenes',
      error: error.message,
    });
  }
};

// De aqui pa alante solo dios sabe que toy haciendo 
  // Función para consultar detalles de un examen específico
const consultarExamen = async (req, res) => {
  const { id } = req.params;

  try {
    const examen = await Examen.findByPk(id);

    if (!examen) {
      return res.status(404).json({ message: 'Examen no encontrado :(' });
    }

    return res.status(200).json(examen);
  } catch (error) {
    return res.status(500).json({
      message: 'Error al consultar el examen',
      error: error.message,
    });
  }
};
// Función para eliminar un examen, like
const eliminarExamen = async (req, res) => {
  const { id } = req.params;

  try {
    const examen = await Examen.findByPk(id);

    if (!examen) {
      return res.status(404).json({ message: 'Examen no encontrado' });
    }

    await examen.destroy();
    return res.status(200).json({ message: 'Examen eliminado exitosamente' });
  } catch (error) {
    return res.status(500).json({
      message: 'Error al eliminar el examen',
      error: error.message,
    });
  }
};
// Función para filtrar exámenes por fecha, like
const filtrarExamenesPorFecha = async (req, res) => {
  const { fecha_inicio, fecha_fin } = req.query;

  try {
    const examenes = await Examen.findAll({
      where: {
        fecha_examen: {
          [Op.gte]: new Date(fecha_inicio),
          [Op.lte]: new Date(fecha_fin),
        },
      },
    });

    return res.status(200).json(examenes);
  } catch (error) {
    return res.status(500).json({
      message: 'Error al filtrar los exámenes por fecha',
      error: error.message,
    });
  }
};
// Función para contar los exámenes por estado, revisar esta funcion 
const contarExamenesPorEstado = async (req,res) => {

  try {
    const pendientes = await Examen.count({ where: { estado: 'pendiente' } });
    const aprobados = await Examen.count({ where: { estado: 'aprobado' } });
    const rechazados = await Examen.count({ where: { estado: 'rechazado' } });

    return res.status(200).json({
      pendientes,
      aprobados,
      rechazados,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error al contar los exámenes por estado',
      error: error.message,
    });
  }
};
// Función para asignar examen a un grupo de estudiantes, like
const asignarExamenMasivo = async (req, res) => {
  const { estudiantes_ids, examen_data } = req.body; // Un array de IDs de estudiantes y datos del examen

  try {
    const examenAsignado = await Examen.bulkCreate(estudiantes_ids.map(id => ({
      estudiante_id: id,
      ...examen_data,
    })));

    return res.status(201).json({
      message: 'Exámenes asignados masivamente exitosamente',
      examenes: examenAsignado,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error al asignar los exámenes',
      error: error.message,
    });
  }
};
// Función para ver el historial de exámenes de un estudiante, revisar 
const historialExamenes = async (req, res) => {
  const { estudiante_id } = req.query;

  try {
    const examenes = await Examen.findAll({ where: { estudiante_id } });

    return res.status(200).json(examenes);
  } catch (error) {
    return res.status(500).json({
      message: 'Error al obtener el historial de exámenes',
      error: error.message,
    });
  }
};
// Función para notificar cambios de estado
const notificarCambioEstado = async (req, res) => {
  const { examen_id, estado, mensaje } = req.body;

  try {
    // Enviar notificación (lógica de notificación no implementada aquí)
    // Aquí se podría usar un servicio de correo electrónico, SMS, etc.

    return res.status(200).json({
      message: `Notificación enviada sobre el cambio de estado del examen ${examen_id} a ${estado}`,
      detalle: mensaje,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error al notificar el cambio de estado',
      error: error.message,
    });
  }
};

// Función para revisar exámenes aprobados/rechazados
const revisionExamenes = async (req, res) => {
  const { estado } = req.query;

  try {
    const examenes = await Examen.findAll({ where: { estado } });

    return res.status(200).json(examenes);
  } catch (error) {
    return res.status(500).json({
      message: 'Error al obtener la revisión de exámenes',
      error: error.message,
    });
  }
};

module.exports = {
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
};
