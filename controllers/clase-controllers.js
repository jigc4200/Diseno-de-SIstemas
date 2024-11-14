// controllers/clase-controllers.js
const Clase = require('../models/clase');
const Materia = require('../models/materia');
const Usuario = require('../models/Usuario');

// Crear una clase
const crearClase = async (req, res) => {
  const { codigo_asignatura, nombre_asignatura, profesor_id, fecha_clase } = req.body;

  try {
    // Verificar que la materia existe
    const materia = await Materia.findByPk(codigo_asignatura);
    if (!materia) {
      return res.status(404).json({ message: 'Materia no encontrada' });
    }

    // Verificar que el profesor existe si se ha asignado
    if (profesor_id) {
      const profesor = await Usuario.findByPk(profesor_id);
      if (!profesor) {
        return res.status(404).json({ message: 'Profesor no encontrado' });
      }
    }

    // Crear la clase
    const nuevaClase = await Clase.create({
      codigo_asignatura,
      nombre_asignatura,
      profesor_id,
      fecha_clase,
    });

    res.status(201).json({ message: 'Clase creada exitosamente', clase: nuevaClase });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la clase', error: error.message });
  }
};

// Listar todas las clases
const listarClases = async (req, res) => {
  try {
    const clases = await Clase.findAll();
    res.status(200).json(clases);
  } catch (error) {
    res.status(500).json({ message: 'Error al listar las clases', error: error.message });
  }
};

// Listar clases por materia o profesor
const listarClasesPorFiltro = async (req, res) => {
  const { codigo_asignatura, profesor_id } = req.query;

  try {
    const filtro = {};
    if (codigo_asignatura) filtro.codigo_asignatura = codigo_asignatura;
    if (profesor_id) filtro.profesor_id = profesor_id;

    const clases = await Clase.findAll({ where: filtro });
    res.status(200).json(clases);
  } catch (error) {
    res.status(500).json({ message: 'Error al filtrar las clases', error: error.message });
  }
};

// Editar clase
const editarClase = async (req, res) => {
  const { codigo_asignatura } = req.params;  // El código de la asignatura será único para cada clase
  const { nombre_asignatura, profesor_id, fecha_clase } = req.body;

  try {
    // Verificar si la clase existe
    const clase = await Clase.findOne({ where: { codigo_asignatura } });
    
    if (!clase) {
      return res.status(404).json({ message: 'Clase no encontrada' });
    }

    // Si se proporciona un profesor_id, verificar que el profesor exista
    if (profesor_id) {
      const profesor = await Usuario.findByPk(profesor_id);
      if (!profesor) {
        return res.status(404).json({ message: 'Profesor no encontrado' });
      }
    }

    // Actualizar los campos de la clase
    clase.nombre_asignatura = nombre_asignatura || clase.nombre_asignatura;
    clase.profesor_id = profesor_id || clase.profesor_id;
    clase.fecha_clase = fecha_clase || clase.fecha_clase;

    // Guardar los cambios
    await clase.save();

    res.status(200).json({
      message: 'Clase actualizada exitosamente',
      clase,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error al actualizar la clase',
      error: error.message,
    });
  }
};

module.exports = {
  editarClase,
  crearClase,
  listarClases,
  listarClasesPorFiltro,
};
