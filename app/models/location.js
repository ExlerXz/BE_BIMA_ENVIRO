'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Location.hasMany(models.Timesheet, {
        foreignKey: {
          name: 'idLocation',
          allowNull: false,
        },
      })
      Location.belongsTo(models.User, {
        foreignKey: {
          name: 'userId',
          allowNull: false,
        },
      })
    }
  }
  Location.init(
    {
      userId: DataTypes.INTEGER,
      date: DataTypes.STRING,
      pit: DataTypes.STRING,
      disposal: DataTypes.STRING,
      location: DataTypes.STRING,
      fuel: DataTypes.STRING,
      fuelhm: DataTypes.STRING,
      postscript: DataTypes.TEXT,
      stopOperation: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Location',
    }
  )
  return Location
}
