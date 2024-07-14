const { Timesheet, Location } = require('../models')
const ApiError = require('../../utils/apiError')

const createTimesheet = async (req, res, next) => {
  const { id } = req.params
  const {
    timeTs,
    material,
    remark,
    activityCode,
    delayCode,
    idleCode,
    repairCode,
  } = req.body
  try {
    const location = await Location.findByPk(id)
    if (!location) throw new ApiError('Location not found', 404)

    const timesheet = await Timesheet.create({
      idLocation: id,
      timeTs,
      material,
      remark,
      activityCode,
      delayCode,
      idleCode,
      repairCode,
    })
    res.status(201).json({
      status: 'success',
      timesheet,
    })
  } catch (err) {
    next(new ApiError(err.message, 500))
  }
}

const getAllTimesheetByLocation = async (req, res, next) => {
  const { id } = req.params
  try {
    const timesheet = await Timesheet.findAll({
      where: {
        idLocation: id,
      },
    })
    res.status(200).json({
      status: 'success',
      timesheet,
    })
  } catch (err) {
    next(new ApiError(err.message, 500))
  }
}

module.exports = { createTimesheet, getAllTimesheetByLocation }
