'use strict'
const { Model } = require('sequelize')
const moment = require('moment-timezone')

module.exports = (sequelize, DataTypes) => {
  class P2hUser extends Model {
    static associate(models) {
      P2hUser.belongsTo(models.User, {
        foreignKey: {
          name: 'userId',
          allowNull: false,
        },
      })

      P2hUser.belongsTo(models.P2h, {
        foreignKey: {
          name: 'p2hId',
          allowNull: false,
        },
      })
    }
  }

  P2hUser.init(
    {
      name: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      p2hId: DataTypes.INTEGER,
      dValidation: { type: DataTypes.BOOLEAN, defaultValue: false },
      mValidation: { type: DataTypes.BOOLEAN, defaultValue: false },
      fValidation: { type: DataTypes.BOOLEAN, defaultValue: false },
      aValidation: { type: DataTypes.BOOLEAN, defaultValue: false },
      createdAt: {
        type: DataTypes.STRING,
        defaultValue: () =>
          moment().tz('Asia/Makassar').format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
      },
      updatedAt: {
        type: DataTypes.STRING,
        defaultValue: () =>
          moment().tz('Asia/Makassar').format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
      },
    },
    {
      sequelize,
      modelName: 'P2hUser',
      hooks: {
        beforeCreate: (p2hUser, options) => {
          p2hUser.createdAt = moment()
            .tz('Asia/Makassar')
            .format('YYYY-MM-DDTHH:mm:ss.SSSZ')
          console.log('Hook beforeCreate - createdAt:', p2hUser.createdAt)
        },
        beforeUpdate: (p2hUser, options) => {
          p2hUser.updatedAt = moment()
            .tz('Asia/Makassar')
            .format('YYYY-MM-DDTHH:mm:ss.SSSZ')
          console.log('Hook beforeUpdate - updatedAt:', p2hUser.updatedAt)
        },
      },
    }
  )

  return P2hUser
}
