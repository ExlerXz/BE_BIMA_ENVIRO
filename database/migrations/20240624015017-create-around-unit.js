'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AroundUnits', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ku: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      kai: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      lotk: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      lodk: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      lopk: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      lohk: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      fd: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      bbcmin: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      kasa: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      kba: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      ba: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      sc: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      ka: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      bdbr: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      kot: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      sohd: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      badtu: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      kas: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      tg: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      g2: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      kogb: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      los: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      loh: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      at: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      lpb: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      lptdkk: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      tb4m: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      dong: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      kr: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      kso: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      ops: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      sk: {
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
    await queryInterface.dropTable('AroundUnits')
  },
}
