const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Auditoria = sequelize.define('Auditoria', {
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false, // Cambiado a false, ya que la auditoría generalmente debe asociarse a un usuario
    references: {
      model: 'usuarios', // Debe coincidir con el nombre de la tabla en la base de datos
      key: 'id',
    },
    onUpdate: 'CASCADE', // Actualizar en cascada si el usuario cambia
    onDelete: 'SET NULL', // Establecer a NULL si el usuario es eliminado
  },
  fecha_hora: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW, // Usa DataTypes.NOW para obtener la fecha y hora actual
  },
  accion: {
    type: DataTypes.STRING(100), // Limitar la longitud de la acción
    allowNull: false, // No debería ser nulo, ya que es necesario registrar la acción
  },
  detalles: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'auditoria', // Nombre de la tabla
  timestamps: false, // Desactivar createdAt y updatedAt
});

// Exportar el modelo
module.exports = Auditoria;
