'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.Auth, {
        foreignKey: {
          name: 'userId',
          allowNull: false,
        },
      })

      User.hasMany(models.P2hUser, {
        foreignKey: {
          name: 'userId',
          allowNull: false,
        },
      })
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
      role: DataTypes.ENUM(['SuperAdmin', 'Admin', 'Forman', 'Driver']),
      isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  )
  return User
}
