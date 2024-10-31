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

// Controlador para obtener todos los usuarios
const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los usuarios', error });
  }
};

module.exports = { crearUsuario, obtenerUsuarios };
