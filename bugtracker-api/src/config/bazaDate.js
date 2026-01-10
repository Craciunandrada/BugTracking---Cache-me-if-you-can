const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, '..', '..', process.env.DATABASE_FILE || 'database.sqlite'),
    logging: false,
});

module.exports = sequelize;