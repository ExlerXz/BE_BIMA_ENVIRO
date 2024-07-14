const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Auth, PasswordReset } = require('../models')
const resetPassword = async (req, res, next) => {
  try {
    const { token, newPassword } = req.body
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const userId = decoded.userId

    const passwordReset = await PasswordReset.findOne({
      where: { token, userId },
    })

    if (!passwordReset || passwordReset.expiresAt < new Date()) {
      return res
        .status(400)
        .json({ message: 'Token tidak valid atau telah kadaluarsa' })
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10)

    await Auth.update({ password: hashedPassword }, { where: { id: userId } })

    await PasswordReset.destroy({ where: { token } })

    res.status(200).json({ message: 'Password berhasil direset' })
  } catch (err) {
    next(err)
  }
}

module.exports = { resetPassword }
