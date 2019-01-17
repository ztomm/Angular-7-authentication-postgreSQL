'use strict';

let tableName = 'UserSession';
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
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      },
      tokenId: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      token: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
      },
      userName: {
        type: Sequelize.STRING,
      },
      userRoleId: {
        type: Sequelize.INTEGER,
      },
      ip: {
        type: Sequelize.STRING,
      },
      expire: {
        type: Sequelize.DATE(6)
      },
      loggedIn: {
        type: Sequelize.BOOLEAN,
      },
      requestUrlBevorLogin: {
        type: Sequelize.STRING,
      },
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable(tableName);
  }
};