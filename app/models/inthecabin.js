'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class InTheCabin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      InTheCabin.hasOne(models.P2h, {
        foreignKey: {
          name: 'idInTheCabin',
          allowNull: false,
        },
      })
    }
  }
  InTheCabin.init(
    {
      ac: DataTypes.BOOLEAN,
      apk: DataTypes.BOOLEAN,
      fs: DataTypes.BOOLEAN,
      fsb: DataTypes.BOOLEAN,
      fsl: DataTypes.BOOLEAN,
      frl: DataTypes.BOOLEAN,
      fm: DataTypes.BOOLEAN,
      fwdaw: DataTypes.BOOLEAN,
      fkp: DataTypes.BOOLEAN,
      fh: DataTypes.BOOLEAN,
      feapar: DataTypes.BOOLEAN,
      frk: DataTypes.BOOLEAN,
      krk: DataTypes.BOOLEAN,
      fb: DataTypes.BOOLEAN,
      ftd: DataTypes.BOOLEAN,
      gps: DataTypes.BOOLEAN,
      icc: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'InTheCabin',
    }
  )
  return InTheCabin
}
