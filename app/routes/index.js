const router = require('express').Router()

const Auth = require('./authRouter')
const User = require('./userRouter')
const Vehicle = require('./vehicleRouter')
const P2h = require('./p2hRouter')
const Timesheet = require('./timesheetRouter')
const Kkh = require('./kkhRouter')

router.use('/api/v1/auth', Auth)
router.use('/api/v1/user', User)
router.use('/api/v1/vehicle', Vehicle)
router.use('/api/v1/p2h', P2h)
router.use('/api/v1/timesheet', Timesheet)
router.use('/api/v1/kkh', Kkh)

module.exports = router
