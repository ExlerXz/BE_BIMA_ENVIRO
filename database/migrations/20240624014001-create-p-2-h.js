'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('P2hs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      idVehicle: {
        type: Sequelize.INTEGER,
      },
      idAroundUnit: {
        type: Sequelize.INTEGER,
      },
      idInTheCabin: {
        type: Sequelize.INTEGER,
      },
      idMachineRoom: {
        type: Sequelize.INTEGER,
      },
      ntsAroundU: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      ntsInTheCabinU: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      ntsMachineRoom: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      date: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      shift: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      time: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      earlyhm: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      endhm: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      earlykm: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      endkm: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      kbj: {
        type: Sequelize.ENUM(['A', 'AA']),
        allowNull: true,
      },
      jobsite: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      location: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('P2hs')
  },
}
