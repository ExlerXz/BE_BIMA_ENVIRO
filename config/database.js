const Sequelize = require('sequelize')

const {
  DATABASE_URL = 'postgres://user:password@localhost:5432/dbname', // Connection string
} = process.env

// Inisialisasi Sequelize dengan connection string
const sequelize = new Sequelize(DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
})

const databaseValidation = async () => {
  try {
    await sequelize.authenticate()
    console.log('Success connect to database')
  } catch (err) {
    console.error(`Unable to connect to the database: ${err}`)
  }
}

module.exports = {
  databaseValidation,
  development: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
  },
  test: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
  },
}
