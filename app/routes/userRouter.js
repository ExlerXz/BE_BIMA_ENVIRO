const router = require('express').Router()

const User = require('../controller/UserController')
const authentication = require('../middlewares/authentication')
const multer = require('../middlewares/multer')

router.get('/', User.getAllUser)
router.get('/byId', authentication, User.getById)
router.patch(
  '/update',
  authentication,
  multer.single('imageUrl'),
  User.updateUser
)
router.delete('/:id', User.deleteMember)

module.exports = router
