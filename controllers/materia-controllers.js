const Materia = require('../models/materia'); // Asegúrate de que la importación sea correcta
const Usuario = require('../models/Usuario'); // Para validar que el profesor existe

// Crear una materia
const crearMateria = async (req, res) => {
    const { codigo_asignatura, nombre_asignatura } = req.body;

    try {
        const nuevaMateria = await Materia.create({
            codigo_asignatura,
            nombre_asignatura,
            departamento_id, // Agrega departamento_id aquí

        });

        return res.status(201).json({
            message: 'Materia creada exitosamente',
            materia: nuevaMateria,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al crear la materia',
            error: error.message,
        });
    }
};

// Listar todas las materias
const listarMaterias = async (req, res) => {
    try {
        const materias = await Materia.findAll();
        return res.status(200).json(materias);
    } catch (error) {
        return res.status(500).json({
            message: 'Error al listar las materias',
            error: error.message,
        });
    }
};

// Asignar profesor a una materia
const asignarProfesorAMateria = async (req, res) => {
    const { codigo_asignatura } = req.params;
    const { profesor_id } = req.body;

    try {
        const materia = await Materia.findOne({ where: { codigo_asignatura } });

        if (!materia) {
            return res.status(404).json({ message: 'Materia no encontrada' });
        }

        // Verificar si el profesor existe
        const profesor = await Usuario.findByPk(profesor_id);
        if (!profesor) {
            return res.status(404).json({ message: 'Profesor no encontrado' });
        }

        // Asignar profesor a la materia
        materia.profesor_id = profesor_id;
        await materia.save();

        return res.status(200).json({
            message: 'Profesor asignado a la materia exitosamente',
            materia,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al asignar el profesor a la materia',
            error: error.message,
        });
    }
};

module.exports = {
    crearMateria,
    listarMaterias,
    asignarProfesorAMateria,
};
