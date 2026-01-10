const { DataTypes } = require('sequelize');
const sequelize = require('../config/bazaDate');

const ListaBuguri = sequelize.define('ListaBuguri', {
    id_bug: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_proiect: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    raportat_de: {
        type: DataTypes.STRING(50),
    },
    severitate: {
        type: DataTypes.STRING(15),
        allowNull: false,
    },
    prioritate: {
        type: DataTypes.STRING(15),
        allowNull: false,
    },
    descriere_bug: {
        type: DataTypes.STRING(255),
    },
    link_commit: {
        type: DataTypes.STRING(100),
    },
    status: {
        type: DataTypes.STRING(15), 
        allowNull: false,
    },
}, {
    tableName: 'lista_buguri',
    timestamps: false,
});

module.exports = ListaBuguri;