const router = require('express').Router()

const P2h = require('../controller/p2hController')
const authentication = require('../middlewares/authentication')

// POST routes (create)
router.post('/dt', authentication, P2h.createP2hDt)
router.post('/bul', authentication, P2h.createP2hBul)
router.post('/lv', authentication, P2h.createP2hLv)
router.post('/bus', authentication, P2h.createP2hBus)
router.post('/ex', authentication, P2h.createP2hEx)
router.post('/location', authentication, P2h.createLocation)

// PATCH routes (update)
router.patch('/location/:id', P2h.updateLocation)
router.patch('/validate/:id', P2h.validateAdmin)
router.patch('/foreman/:id', P2h.validationForeman)
router.patch('/notes/:id', P2h.addNotesF)

// GET routes (fetch data)
router.get('/location/:id', P2h.getLocationById) // more specific should come first
router.get('/location', P2h.getAllLocation) // more general should come later
router.get('/vehicle/:id', P2h.getP2hByVehicle)
router.get('/last', authentication, P2h.getLastCreatedByUser)
router.get('/allId', authentication, P2h.getAllP2hById)
router.get('/p2hkkh', P2h.getAllData)
router.get('/length', P2h.getLength)
router.get('/month', P2h.getAllP2hGroupedByMonth)
router.get('/week', P2h.getAllP2hForThisAndLastWeek)
router.get('/all', P2h.getAllP2h)
router.get('/:id', P2h.getP2hById) // this should be the last as it's the most general

module.exports = router
