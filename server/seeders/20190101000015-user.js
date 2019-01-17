'use strict';

let tableName = 'User';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert(tableName, [
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        active: '1',
        username: 'admin',
        email: 'admin@pean-auth-app.com',
        password: '$2a$10$TrDq775vgno518jn3McDuOpEyzy1lpUniknhgYGG3aagpyMQ4VIS.', //admin
        roleId: 3,
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        active: '1',
        username: 'user',
        email: 'user@pean-auth-app.com',
        password: '$2a$10$Fe/APnhObERoAMW/0Bfa7.fKGJQM0/bUhX7oJR.ddx2of.V58yo52', //user
        roleId: 2,
      },
    ], {});
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete(tableName, null, {});
  }
};