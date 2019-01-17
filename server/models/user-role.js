let modelName = 'UserRole';
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
    active: {
      type: DataTypes.STRING
    },
    role: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  });
  return model;
};