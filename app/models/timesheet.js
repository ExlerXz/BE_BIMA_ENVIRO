'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Timesheet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Timesheet.init(
    {
      idLocation: DataTypes.INTEGER,
      timeTs: DataTypes.TIME,
      material: DataTypes.STRING,
      remark: DataTypes.STRING,
      activityCode: DataTypes.STRING,
      delayCode: DataTypes.STRING,
      idleCode: DataTypes.STRING,
      repairCode: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Timesheet',
    }
  )
  return Timesheet
}
