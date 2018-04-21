'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Places', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      open: {
        type: Sequelize.TIME
      },
      close: {
        type: Sequelize.TIME
      },
      lat: {
        type: Sequelize.NUMERIC,
      },
      lon: {
        type: Sequelize.NUMERIC,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Places');
  }
};