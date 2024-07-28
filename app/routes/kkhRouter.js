const router = require('express').Router()

const Kkh = require('../controller/kkhController')
const authentication = require('../middlewares/authentication')
const multer = require('../middlewares/multer')

router.post('/', authentication, multer.single('imageUrl'), Kkh.createKkh)
router.get('/', Kkh.getAllKkh)
router.get('/byId', authentication, Kkh.getKkhById)
router.get('/mounth', Kkh.getAllKkhGroupedByMonth)
router.get('/week', Kkh.getAllKkhForThisAndLastWeek)
router.get('/last', authentication, Kkh.getLastCreated)

module.exports = router
