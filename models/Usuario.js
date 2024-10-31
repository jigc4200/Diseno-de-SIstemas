// models/Usuario.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../configBD/database');

const Usuario = sequelize.define('Usuarios', { // Cambia 'Usuario' por 'Usuarios'
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  correo_electronico: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('admin', 'student', 'professor'),
    allowNull: false,
  },
  cedula: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'usuarios', // Asegúrate de que el nombre de la tabla es 'usuarios'
});


// Asegúrate de que el modelo se exporte correctamente
module.exports = Usuario;
