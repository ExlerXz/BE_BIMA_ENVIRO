'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Locations', 'postscript', {
      type: Sequelize.TEXT,
      allowNull: true,
    })

    await queryInterface.addColumn('Locations', 'stopOperation', {
      type: Sequelize.STRING,
      allowNull: true,
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Locations', 'postscript')
    await queryInterface.removeColumn('Locations', 'stopOperation')
  },
}
