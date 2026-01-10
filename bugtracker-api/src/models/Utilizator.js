const { DataTypes } = require('sequelize');
const sequelize = require('../config/bazaDate');

const Utilizator = sequelize.define('Utilizator', {
    id_user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
    },
    nume: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    rol: {
        type: DataTypes.STRING(40), 
        allowNull: false,
    },
    parola: {
        type: DataTypes.STRING, 
        allowNull: false,
    },
    data_creare: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'utilizator',
    timestamps: false,
});

module.exports = Utilizator;