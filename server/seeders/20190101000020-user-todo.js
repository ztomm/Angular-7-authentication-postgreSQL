'use strict';

let tableName = 'Todo';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert(tableName, [
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 2,
        active: '1',
        title: 'buy some tee',
        deadline: new Date(),
        done: 0,
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 2,
        active: '1',
        title: 'wash the dishes',
        deadline: new Date(),
        done: 0,
      }
    ], {});
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete(tableName, null, {});
  }
};