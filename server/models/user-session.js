let modelName = 'UserSession';
module.exports = function(sequelize, DataTypes) {
  let model = sequelize.define(modelName, {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    },
    tokenId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    token: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    userName: {
      type: DataTypes.STRING,
    },
    userRoleId: {
      type: DataTypes.INTEGER,
    },
    ip: {
      type: DataTypes.STRING,
    },
    expire: {
      type: DataTypes.DATE(6)
    },
    loggedIn: {
      type: DataTypes.BOOLEAN,
    },
    requestUrlBevorLogin: {
      type: DataTypes.STRING,
    },
  });
  return model;
};