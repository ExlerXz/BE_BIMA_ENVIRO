'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AroundUnit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AroundUnit.init({
    ku: DataTypes.BOOLEAN,
    kai: DataTypes.BOOLEAN,
    lotk: DataTypes.BOOLEAN,
    lodk: DataTypes.BOOLEAN,
    lopk: DataTypes.BOOLEAN,
    lohk: DataTypes.BOOLEAN,
    fd: DataTypes.BOOLEAN,
    bbcmin: DataTypes.BOOLEAN,
    kasa: DataTypes.BOOLEAN,
    kba: DataTypes.BOOLEAN,
    ba: DataTypes.BOOLEAN,
    sc: DataTypes.BOOLEAN,
    ka: DataTypes.BOOLEAN,
    bdbr: DataTypes.BOOLEAN,
    kot: DataTypes.BOOLEAN,
    sohd: DataTypes.BOOLEAN,
    badtu: DataTypes.BOOLEAN,
    kas: DataTypes.BOOLEAN,
    tg: DataTypes.BOOLEAN,
    g2: DataTypes.BOOLEAN,
    kogb: DataTypes.BOOLEAN,
    los: DataTypes.BOOLEAN,
    loh: DataTypes.BOOLEAN,
    at: DataTypes.BOOLEAN,
    lpb: DataTypes.BOOLEAN,
    lptdkk: DataTypes.BOOLEAN,
    tb4m: DataTypes.BOOLEAN,
    dong: DataTypes.BOOLEAN,
    kr: DataTypes.BOOLEAN,
    kso: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'AroundUnit',
  });
  return AroundUnit;
};