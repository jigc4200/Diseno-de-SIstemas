const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const ReciboPago = sequelize.define('ReciboPago', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  estudiante_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'usuarios', // Relación con la tabla usuarios
      key: 'id',
    },
  },
  numero_recibo: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  codigo_asignatura: {
    type: DataTypes.STRING(20),
    allowNull: true,
    references: {
      model: 'materias', // Relación con la tabla materias
      key: 'codigo_asignatura',
    },
  },
}, {
  tableName: 'recibos_pago',
  timestamps: false,
});

module.exports = ReciboPago;
