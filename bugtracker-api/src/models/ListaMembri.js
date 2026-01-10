const { DataTypes } = require('sequelize');
const sequelize = require('../config/bazaDate');

const ListaMembri = sequelize.define('ListaMembri', {
    id_membru: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_proiect: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_user: {
        type: DataTypes.INTEGER, 
        allowNull: false,
    },
    rol_membru: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
}, {
    tableName: 'lista_membri',
    timestamps: false,
    indexes: [
        { unique: true, fields: ['id_proiect', 'id_user'] }
    ]
});

module.exports = ListaMembri;