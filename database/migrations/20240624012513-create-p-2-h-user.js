'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('P2hUsers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      userId: {
        type: Sequelize.INTEGER,
      },
      p2hId: {
        type: Sequelize.INTEGER,
      },
      dValidation: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      mValidation: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      fValidation: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      aValidation: {
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
    await queryInterface.dropTable('P2hUsers')
  },
}
