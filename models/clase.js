// models/clase.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Clase = sequelize.define('Clase', {
  codigo_asignatura: {
    type: DataTypes.STRING(20),
    allowNull: false,
    references: {
      model: 'materias', // Relación con la tabla de materias
      key: 'codigo_asignatura',
    },
  },
  nombre_clase: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  profesor_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'usuarios', // Relación con la tabla de usuarios
      key: 'id',
    },
  },
  fecha_clase: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  tableName: 'clases',
  timestamps: true, // Cambia a true si deseas manejar createdAt y updatedAt
});

module.exports = Clase;
