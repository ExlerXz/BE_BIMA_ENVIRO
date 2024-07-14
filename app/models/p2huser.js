'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class P2hUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
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
      dValidation: DataTypes.BOOLEAN,
      mValidation: DataTypes.BOOLEAN,
      fValidation: DataTypes.BOOLEAN,
      aValidation: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'P2hUser',
    }
  )
  return P2hUser
}
