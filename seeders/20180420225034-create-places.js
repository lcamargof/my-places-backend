'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Places', [
      {
        name: 'Awesome place',
        open: '00:00',
        close: '23:00',
        description: 'This is an awesome place',
        lon: -103.40932570000001,
        lat: 20.6713195
      },
      {
        name: 'OH GOD',
        open: '00:00',
        close: '23:00',
        description: 'Oh my!',
        lon: -103.40932570000001,
        lat: 20.6713195
      },
      {
        name: 'ROCKET!',
        open: '19:00',
        close: '23:00',
        description: 'rocket power',
        lon: -103.41932570000001,
        lat: 20.6713195
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Places', null, {});
  }
};
