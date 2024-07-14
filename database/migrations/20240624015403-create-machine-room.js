'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MachineRooms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ar: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      oe: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      os: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      fba: {
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
    await queryInterface.dropTable('MachineRooms')
  },
}
