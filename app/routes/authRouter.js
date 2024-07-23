const router = require('express').Router()

const Auth = require('../controller/authController')
const authentication = require('../middlewares/authentication')

router.post('/login', Auth.login)
router.post('/login-admin', Auth.loginAdmin)
router.post('/register-member', Auth.registeringMember)
router.get('/verify', Auth.verifyUser)
router.post('/send-email', Auth.forgotPassword)
router.post('/reset-password', Auth.resetPassword)
router.patch('/change-password', authentication, Auth.changePassword)
router.get('/me', authentication, Auth.getMe)

module.exports = router
