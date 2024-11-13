// models/clase.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Clase = sequelize.define('Clase', {
  codigo_asignatura: {
    type: DataTypes.STRING(20),
    allowNull: false,
    primaryKey: true, // Definir como clave primaria
    references: {
      model: 'materias', // Relación con la tabla de materias
      key: 'codigo_asignatura',
    },
  },
  nombre_asignatura: { // Cambiado para coincidir con la columna de la tabla SQL
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
  timestamps: true, // Mantiene createdAt y updatedAt
});

module.exports = Clase;
