'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Vehicles',
      [
        {
          type: 'Bulldozer',
          modelu: 'CAT',
          nou: 'BL-10',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: 'Dump Truck',
          modelu: 'Volvo',
          nou: 'DT-128',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: 'Excavator',
          modelu: 'CAT',
          nou: 'EX-16',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: 'Light Vehicle',
          modelu: 'Toyota',
          nou: 'LV-66',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: 'Sarana Bus',
          modelu: 'Mitsubishi',
          nou: 'BS-14',
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
