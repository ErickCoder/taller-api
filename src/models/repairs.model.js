const { DataTypes } = require('sequelize');
const { db } = require('./../database/config');

const Repairs = db.define('repairs', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },

  status: {
    type: DataTypes.ENUM('pending', 'completed', 'cancelled'),
    allowNull: false,
    defaultValue: 'pending',
  },

  userid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'userid',
  },
});

module.exports = Repairs;
