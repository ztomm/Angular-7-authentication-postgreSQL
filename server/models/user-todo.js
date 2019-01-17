let modelName = 'Todo';
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
    userId: {
      type: DataTypes.INTEGER
    },
    active: {
      type: DataTypes.STRING
    },
    title: {
      type: DataTypes.STRING
    },
    deadline: {
      type: DataTypes.DATE
    },
    done: {
      type: DataTypes.DECIMAL
    }
  });
  return model;
};