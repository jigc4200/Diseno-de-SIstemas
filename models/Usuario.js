const { DataTypes } = require('sequelize');
const { sequelize } = require('../configBD/database');

const Usuario = sequelize.define('usuario', {
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
  // Configuración para desactivar las columnas createdAt y updatedAt
  timestamps: false,
});

// Asegúrate de que el modelo se exporte correctamente
module.exports = Usuario;