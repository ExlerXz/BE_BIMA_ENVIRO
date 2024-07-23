'use strict'
const { Model } = require('sequelize')
const moment = require('moment-timezone')
module.exports = (sequelize, DataTypes) => {
  class Kkh extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Kkh.belongsTo(models.User, {
        foreignKey: 'userId',
      })
    }
  }
  Kkh.init(
    {
      userId: DataTypes.INTEGER,
      date: DataTypes.STRING,
      afterworktime: DataTypes.STRING,
      bedtime: DataTypes.TIME,
      wakeuptime: DataTypes.TIME,
      totaltime: DataTypes.STRING,
      departuretime: DataTypes.STRING,
      complaint: DataTypes.STRING,
      wValidation: { type: DataTypes.BOOLEAN, defaultValue: false },
      fValidation: { type: DataTypes.BOOLEAN, defaultValue: false },
      imageUrl: DataTypes.STRING,
      updatedAt: {
        type: DataTypes.STRING,
        defaultValue: () =>
          moment().tz('Asia/Makassar').format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
      },
    },
    {
      sequelize,
      modelName: 'Kkh',
      hooks: {
        beforeUpdate: (kkh, options) => {
          kkh.updatedAt = moment()
            .tz('Asia/Makassar')
            .format('YYYY-MM-DDTHH:mm:ss.SSSZ')
          console.log('Hook beforeUpdate - updatedAt:', kkh.updatedAt)
        },
      },
    }
  )
  return Kkh
}
