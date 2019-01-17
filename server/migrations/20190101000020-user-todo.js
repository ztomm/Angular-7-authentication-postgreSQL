'use strict';

let tableName = 'Todo';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable(tableName, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      userId: {
        type: Sequelize.INTEGER
      },
      active: {
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING
      },
      deadline: {
        type: Sequelize.DATE
      },
      done: {
        type: Sequelize.DECIMAL
      },
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable(tableName);
  }
};