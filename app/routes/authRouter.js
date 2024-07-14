const router = require('express').Router()

const Auth = require('../controller/authController')
const resetPassword = require('../middlewares/resetPassword')
const authentication = require('../middlewares/authentication')

router.post('/login', Auth.login)
router.post('/register-member', Auth.registeringMember)
router.get('/verify', Auth.verifyUser)
router.post('/forgot-password', Auth.forgotPassword)
router.post('/reset-password', resetPassword.resetPassword)
router.get('/me', authentication, Auth.getMe)

module.exports = router
