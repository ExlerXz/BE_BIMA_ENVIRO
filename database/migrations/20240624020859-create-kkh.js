'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Kkhs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
      },
      date: {
        type: Sequelize.STRING,
      },
      afterworktime: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      bedtime: {
        type: Sequelize.TIME,
      },
      wakeuptime: {
        type: Sequelize.TIME,
      },
      totaltime: {
        type: Sequelize.STRING,
      },
      departuretime: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      complaint: {
        type: Sequelize.STRING,
      },
      wValidation: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      fValidation: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      imageUrl: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Kkhs')
  },
}
