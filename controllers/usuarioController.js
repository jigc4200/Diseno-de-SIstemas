// controllers/usuarioController.js
const { Usuario } = require('../models/Usuario'); // Asegúrate de que exista el modelo Usuario

// Controlador para crear un usuario
const crearUsuario = async (req, res) => {
  try {
    const { username, apellido, correo_electronico, password, role, cedula } = req.body;
    const nuevoUsuario = await Usuario.create({ username, apellido, correo_electronico, password, role, cedula });
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el usuario', error });
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
