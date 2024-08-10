'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('P2hs', 'ntsAroundUf', {
      type: Sequelize.TEXT,
      allowNull: true,
    })
    await queryInterface.addColumn('P2hs', 'ntsInTheCabinUf', {
      type: Sequelize.TEXT,
      allowNull: true,
    })
    await queryInterface.addColumn('P2hs', 'ntsMachineRoomf', {
      type: Sequelize.TEXT,
      allowNull: true,
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('P2hs', 'ntsAroundUf')
    await queryInterface.removeColumn('P2hs', 'ntsInTheCabinUf')
    await queryInterface.removeColumn('P2hs', 'ntsMachineRoomf')
  },
}
