const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Examen = sequelize.define('Examen', {
  estudiante_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'usuarios', // Relación con la tabla de usuarios (estudiantes)
      key: 'id',
    },
  },
  codigo_asignatura: {
    type: DataTypes.STRING(20),
    allowNull: true,
    references: {
      model: 'materias', // Relación con la tabla de materias
      key: 'codigo_asignatura',
    },
  },
  tipo: {
    type: DataTypes.ENUM('recuperacion', 'convocatoria'),
    allowNull: false,
  },
  estado: {
    type: DataTypes.ENUM('pendiente', 'aprobado', 'rechazado'),
    allowNull: false,
  },
}, {
  tableName: 'examenes',
  timestamps: false, // Usar createdAt y updatedAt si es necesario
});

module.exports = Examen;
