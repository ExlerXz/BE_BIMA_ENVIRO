const router = require('express').Router()

const P2h = require('../controller/p2hController')
const authentication = require('../middlewares/authentication')

router.post('/dt', authentication, P2h.createP2hDt)
router.post('/bul', authentication, P2h.createP2hBul)
router.post('/lv', authentication, P2h.createP2hLv)
router.post('/bus', authentication, P2h.createP2hBus)
router.post('/ex', authentication, P2h.createP2hEx)
router.get('/all', P2h.getAllP2h)
router.get('/p2hkkh', P2h.getAllData)
router.get('/vehicle/:id', P2h.getP2hByVehicle)
router.get('/month', P2h.getAllP2hGroupedByMonth)
router.get('/week', P2h.getAllP2hForThisAndLastWeek)
router.patch('/validate/:id', P2h.validateAdmin)

module.exports = router
