const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const File = sequelize.define('File', {
  filename: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  originalName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  path: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = File;
