'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Timesheets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      idLocation: {
        type: Sequelize.INTEGER,
      },
      timeTs: {
        type: Sequelize.TIME,
      },
      material: {
        type: Sequelize.STRING,
      },
      remark: {
        type: Sequelize.STRING,
      },
      activityCode: {
        type: Sequelize.STRING,
      },
      delayCode: {
        type: Sequelize.STRING,
      },
      idleCode: {
        type: Sequelize.STRING,
      },
      repairCode: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('Timesheets')
  },
}
