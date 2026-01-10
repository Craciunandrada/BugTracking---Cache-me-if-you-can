const { DataTypes } = require('sequelize');
const sequelize = require('../config/bazaDate');

const Proiect = sequelize.define('Proiect', {
    id_proiect: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nume: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    url: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    id_user: {
        type: DataTypes.INTEGER, 
        allowNull: false,
    },
    data_creare: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'proiect',
    timestamps: false,
});

module.exports = Proiect;