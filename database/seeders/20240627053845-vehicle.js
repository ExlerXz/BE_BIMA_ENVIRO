'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Vehicles',
      [
        {
          type: 'Bulldozer',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: 'Dump Truck',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: 'Excavator',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: 'Light Vehicle',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: 'Sarana Bus',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Vehicles', null, {})
  },
}
