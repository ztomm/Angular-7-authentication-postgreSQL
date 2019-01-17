'use strict';

let tableName = 'UserRole';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert(tableName, [
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        active: '1',
        role: 'guest',
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        active: '1',
        role: 'user',
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        active: '1',
        role: 'admin',
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        active: '1',
        role: 'superadmin',
      },
    ], {});
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete(tableName, null, {});
  }
};