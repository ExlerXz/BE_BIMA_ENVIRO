'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class MachineRoom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      MachineRoom.hasOne(models.P2h, {
        foreignKey: {
          name: 'idMachineRoom',
          allowNull: false,
        },
      })
    }
  }
  MachineRoom.init(
    {
      ar: DataTypes.BOOLEAN,
      oe: DataTypes.BOOLEAN,
      os: DataTypes.BOOLEAN,
      fba: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'MachineRoom',
    }
  )
  return MachineRoom
}
