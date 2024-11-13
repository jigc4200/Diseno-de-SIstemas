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

// Función para listar todos los exámenes
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

module.exports = {
  crearExamen,
  actualizarEstado,
  listarExamenes,
};
