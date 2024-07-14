'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('InTheCabins', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ac: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      fs: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      fsb: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      fsl: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      frl: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      fm: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      fwdaw: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      fkp: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      fh: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      feapar: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      frk: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      krk: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      fb: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      ftd: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      gps: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      icc: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      apk: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('InTheCabins')
  },
}
