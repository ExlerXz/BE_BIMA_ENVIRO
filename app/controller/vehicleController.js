const { Vehicle } = require('../models')

const ApiError = require('../../utils/apiError')

const createVehicle = async (req, res, next) => {
  try {
    const vehicle = await Vehicle.create(req.body)
    return res
      .status(201)
      .json({ status: 'success', message: 'Vehicle created', vehicle })
  } catch (err) {
    next(new ApiError(err.message, 500))
  }
}

const getAllVehicle = async (req, res, next) => {
  try {
    const vehicles = await Vehicle.findAll()
    return res.status(200).json({ status: 'success', vehicles })
  } catch (err) {
    next(new ApiError(err.message, 500))
  }
}

module.exports = { createVehicle, getAllVehicle }
