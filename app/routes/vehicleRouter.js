const router = require('express').Router()

const Vehicle = require('../controller/vehicleController')

router.post('/', Vehicle.createVehicle)
router.get('/', Vehicle.getAllVehicle)
router.get('/type', Vehicle.getVehicleByType)

module.exports = router
