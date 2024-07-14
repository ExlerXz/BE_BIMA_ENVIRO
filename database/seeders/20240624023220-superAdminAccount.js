'use strict'

const bcrypt = require('bcrypt')
const dotenv = require('dotenv')

dotenv.config()

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'superAdmin',
        phoneNumber: '+628236576342564',
        role: 'SuperAdmin',
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])

    const adminPassword = process.env.PASSWORD_HASH
    const saltRounds = 10
    const hashedPassword = bcrypt.hashSync(adminPassword, saltRounds)

    await queryInterface.bulkInsert('Auths', [
      {
        username: 'superAdmin',
        email: 'superAdmin@mail.com',
        password: hashedPassword,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {})
    await queryInterface.bulkDelete('Auths', null, {})
  },
}
