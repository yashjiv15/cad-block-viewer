const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const File = require('./File');

const Block = sequelize.define('Block', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  x: {
    type: DataTypes.FLOAT,
  },
  y: {
    type: DataTypes.FLOAT,
  },
  z: {
    type: DataTypes.FLOAT,
  },
  entities: {
    type: DataTypes.JSONB, // or DataTypes.JSON for MySQL
  },
});

// Associations
File.hasMany(Block, { foreignKey: 'fileId' });
Block.belongsTo(File, { foreignKey: 'fileId' });

module.exports = Block;
