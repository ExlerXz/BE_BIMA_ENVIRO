const router = require('express').Router()

const Timesheet = require('../controller/timesheetController')

router.post('/:id', Timesheet.createTimesheet)
router.get('/location/:id', Timesheet.getAllTimesheetByLocation)

module.exports = router
