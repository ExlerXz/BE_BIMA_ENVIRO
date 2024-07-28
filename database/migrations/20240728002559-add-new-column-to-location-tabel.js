'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Locations', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: true,
    })

    await queryInterface.addColumn('Locations', 'date', {
      type: Sequelize.STRING,
      allowNull: true,
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Locations', 'userId')
    await queryInterface.removeColumn('Locations', 'date')
  },
}
