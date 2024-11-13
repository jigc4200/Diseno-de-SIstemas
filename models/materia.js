const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Materia = sequelize.define('Materia', {
    codigo_asignatura: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    nombre_asignatura: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    
    departamento_id: { 
        type: DataTypes.INTEGER,
        allowNull: false, 
        references: {
            model: 'departamentos', // Nombre de la tabla 
            key: 'id',
        },
    },
}, {
    tableName: 'materias',
    timestamps: false,
});

module.exports = Materia;
