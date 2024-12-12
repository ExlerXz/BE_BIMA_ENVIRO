'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class P2h extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      P2h.hasMany(models.P2hUser, {
        foreignKey: {
          name: 'p2hId',
          allowNull: false,
        },
      })

      P2h.belongsTo(models.Vehicle, {
        foreignKey: {
          name: 'idVehicle',
          allowNull: false,
        },
      })

      P2h.belongsTo(models.AroundUnit, {
        foreignKey: {
          name: 'idAroundUnit',
          allowNull: false,
        },
      })

      P2h.belongsTo(models.InTheCabin, {
        foreignKey: {
          name: 'idInTheCabin',
          allowNull: false,
        },
      })

      P2h.belongsTo(models.MachineRoom, {
        foreignKey: {
          name: 'idMachineRoom',
          allowNull: false,
        },
      })
    }
  }
  P2h.init(
    {
      idVehicle: DataTypes.INTEGER,
      idAroundUnit: DataTypes.INTEGER,
      idInTheCabin: DataTypes.INTEGER,
      idMachineRoom: DataTypes.INTEGER,
      ntsAroundU: { type: DataTypes.STRING, allowNull: true },
      ntsInTheCabinU: { type: DataTypes.STRING, allowNull: true },
      ntsMachineRoom: { type: DataTypes.STRING, allowNull: true },
      ntsAroundUf: { type: DataTypes.STRING, allowNull: true },
      ntsInTheCabinUf: { type: DataTypes.STRING, allowNull: true },
      ntsMachineRoomf: { type: DataTypes.STRING, allowNull: true },
      date: DataTypes.STRING,
      shift: DataTypes.STRING,
      time: DataTypes.STRING,
      earlyhm: DataTypes.STRING,
      endhm: DataTypes.STRING,
      earlykm: DataTypes.STRING,
      endkm: DataTypes.STRING,
      kbj: { type: DataTypes.ENUM(['A', 'AA']), allowNull: true },
      jobsite: DataTypes.STRING,
      location: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'P2h',
    }
  )
  return P2h
}
