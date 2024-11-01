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
    profesor_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'usuarios', // Debe coincidir con el nombre de la tabla en la base de datos
            key: 'id',
        },
    },
    departamento_id: { // Asegúrate de que esta columna esté definida
        type: DataTypes.INTEGER,
        allowNull: false, // Cambia esto según si es obligatorio o no
        references: {
            model: 'departamentos', // Nombre de la tabla que referencia
            key: 'id',
        },
    },
}, {
    tableName: 'materias',
    timestamps: false,
});

module.exports = Materia;
