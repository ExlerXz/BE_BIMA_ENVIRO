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

      User.hasMany(models.Kkh, {
        foreignKey: {
          name: 'userId',
          allowNull: false,
        },
      })

      User.hasMany(models.Location, {
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
      imageUrl: {
        type: DataTypes.STRING,
        defaultValue:
          'https://tse2.mm.bing.net/th?id=OIP.U2iQ7wNK6ZzTW_traW_-PQHaHa&pid=Api&P=0&h=180',
      },
      role: {
        type: DataTypes.ENUM(['SuperAdmin', 'Forman', 'Driver']),
        defaultValue: 'Driver',
      },
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
