'use strict';
module.exports = (sequelize, DataTypes) => {
  var Places = sequelize.define('Places', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    open: DataTypes.TIME,
    close: DataTypes.TIME,
    lat: DataTypes.NUMERIC,
    lon: DataTypes.NUMERIC,
  }, {
    timestamps: false
  });
  return Places;
};