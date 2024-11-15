// controllers/usuarioController.js
const Usuario = require('../models/Usuario'); 

// Controlador para crear un usuario
crearUsuario = async (req, res) => {
    try {
      const { username, apellido, correo_electronico, password, role, cedula } = req.body;
  
      // Crea un nuevo usuario
      const nuevoUsuario = await Usuario.create({
        username,
        apellido,
        correo_electronico,
        password, // Recuerda que deberías hashear la contraseña antes de guardarla
        role,
        cedula,
      });
  
      return res.status(201).json(nuevoUsuario);
    } catch (error) {
      console.error("Error al crear el usuario:", error);
      return res.status(500).json({ message: "Error al crear el usuario", error });
    }
  };
/*
// Controlador para obtener todos los usuarios // DEPRECATED
const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los usuarios', error });
  }
};
*/
// Controlador para obtener todos los usuarios, con filtro opcional por rol
const obtenerUsuarios = async (req, res) => {
  try {
    const { role } = req.query;
    const condition = role ? { role } : {};
    const usuarios = await Usuario.findAll({ where: condition });
    return res.status(200).json(usuarios);
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    return res.status(500).json({ message: 'Error al obtener los usuarios', error });
  }
};

/////////// DE AQUI PA ALANTE SOLO DIOS SABE QUE TOY HACIENDO
// Controlador para consultar un usuario por ID, correo electrónico o cédula
const consultarUsuario = async (req, res) => {
  try {
    const { id, correo_electronico, cedula } = req.query;

    // Validación de parámetros
    if (!id && !correo_electronico && !cedula) {
      return res.status(400).json({
        message: 'Debe proporcionar al menos un parámetro de búsqueda (id, correo_electronico o cedula).',
      });
    }

    // Construcción de condición de búsqueda
    const condition = {};
    if (id) condition.id = id;
    if (correo_electronico) condition.correo_electronico = correo_electronico;
    if (cedula) condition.cedula = cedula;

    const usuario = await Usuario.findOne({ where: condition });

    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    return res.status(200).json(usuario);
  } catch (error) {
    console.error("Error al consultar el usuario:", error);
    return res.status(500).json({ message: 'Error al consultar el usuario', error });
  }
};

// Controlador para actualizar un usuario por cedula o correo electrónico
const actualizarUsuario = async (req, res) => {
  try {
    const { cedula, correo_electronico } = req.query; // Utilizamos query params para obtener cedula o correo
    const { username, apellido, role, correo_electronico_nuevo } = req.body;

    // Condición para buscar por cedula o correo electrónico
    const condition = cedula ? { cedula } : correo_electronico ? { correo_electronico } : null;

    if (!condition) {
      return res.status(400).json({ message: 'Debe proporcionar una cédula o un correo electrónico' });
    }

    // Buscar el usuario por la condición
    const usuario = await Usuario.findOne({ where: condition });

    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Si el correo electrónico nuevo es proporcionado, validamos que no esté en uso
    if (correo_electronico_nuevo) {
      const existingUser = await Usuario.findOne({ where: { correo_electronico: correo_electronico_nuevo } });
      if (existingUser) {
        return res.status(400).json({ message: 'El correo electrónico ya está en uso' });
      }
      usuario.correo_electronico = correo_electronico_nuevo;
    }

    // Actualizar los campos del usuario con los valores proporcionados en el cuerpo de la solicitud
    usuario.username = username || usuario.username;
    usuario.apellido = apellido || usuario.apellido;
    usuario.role = role || usuario.role;
    await usuario.save();

    return res.status(200).json(usuario);
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    return res.status(500).json({ message: 'Error al actualizar el usuario', error });
  }
};

// Controlador para eliminar un usuario por cédula
const eliminarUsuario = async (req, res) => {
  try {
    const { cedula } = req.params;  // Cambiamos id por cedula
    const usuario = await Usuario.findOne({ where: { cedula } });  // Buscamos por cedula

    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Realizar verificación de registros asociados críticos antes de eliminar
    await usuario.destroy();
    return res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    return res.status(500).json({ message: 'Error al eliminar el usuario', error });
  }
};
// Controlador para restablecer la contraseña de un usuario por cédula
const restablecerPassword = async (req, res) => {
  try {
    const { cedula } = req.params; // Cambiamos id por cedula
    const { password } = req.body;
    
    // Buscar usuario por cédula
    const usuario = await Usuario.findOne({ where: { cedula } });

    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    usuario.password = password; // Asegúrate de hashear la nueva contraseña
    await usuario.save();
    return res.status(200).json({ message: 'Contraseña restablecida correctamente' });
  } catch (error) {
    console.error("Error al restablecer la contraseña:", error);
    return res.status(500).json({ message: 'Error al restablecer la contraseña', error });
  }
};


module.exports = { crearUsuario, obtenerUsuarios, consultarUsuario, actualizarUsuario,eliminarUsuario,restablecerPassword };
