const Auditoria = require('../models/auditoria'); // Asegúrate de que el modelo de Auditoría está correctamente importado

// Función para registrar una acción en la auditoría
const registrarAccion = async (req, res) => {
    const { usuario_id, accion, detalles } = req.body;

    // Validación de entrada
    if (!usuario_id || !accion) {
        return res.status(400).json({
            message: 'Faltan campos requeridos: usuario_id y accion',
        });
    }

    try {
        const nuevaAuditoria = await Auditoria.create({
            usuario_id,
            accion,
            detalles,
        });

        return res.status(201).json({
            message: 'Acción registrada exitosamente',
            auditoria: nuevaAuditoria,
        });
    } catch (error) {
        console.error('Error al registrar la acción:', error); // Log para facilitar depuración
        return res.status(500).json({
            message: 'Error al registrar la acción',
            error: error.message,
        });
    }
};

// Función para consultar la auditoría
const consultarAuditoria = async (req, res) => {
    try {
        const auditoria = await Auditoria.findAll(); // Puedes añadir filtros según sea necesario

        return res.status(200).json(auditoria);
    } catch (error) {
        console.error('Error al obtener los registros de auditoría:', error); // Log para facilitar depuración
        return res.status(500).json({
            message: 'Error al obtener los registros de auditoría',
            error: error.message,
        });
    }
};

module.exports = {
    registrarAccion,
    consultarAuditoria,
};
