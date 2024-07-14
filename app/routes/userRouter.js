const router = require('express').Router()

const User = require('../controller/UserController')
const multer = require('../middlewares/multer')

router.get('/', User.getAllUser)
router.patch('/:id', multer.single('imageUrl'), User.updateUser)
router.delete('/:id', User.deleteMember)

module.exports = router
