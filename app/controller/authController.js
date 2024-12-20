const { Auth, User, PasswordReset, VerificationToken } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const { Sequelize, Op } = require('sequelize')

const ApiError = require('../../utils/apiError')

const login = async (req, res, next) => {
  try {
    const { usernameOrEmail, password } = req.body

    if (!usernameOrEmail || !password) {
      throw new ApiError('Username/Email and password are required', 400)
    }

    const user = await Auth.findOne({
      where: {
        [Op.or]: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
      },
      include: User,
    })

    if (!user) {
      throw new ApiError('User not found', 404)
    }

    if (!user.User.isVerified) {
      throw new ApiError('User is not verified', 403)
    }

    if (user && bcrypt.compareSync(password, user.password)) {
      const payload = {
        id: user.id,
        name: user.User.name,
        username: user.username,
        email: user.email,
        phoneNumber: user.User.phoneNumber,
        role: user.User.role,
      }
      const token = jwt.sign(payload, process.env.JWT_SECRET)

      return res.status(200).json({
        status: 'success',
        message: 'Login success',
        token,
        payload,
        role: user.User.role,
      })
    } else {
      return next(new ApiError('Incorrect password', 401))
    }
  } catch (err) {
    next(new ApiError(err.message, 500))
  }
}

const loginAdmin = async (req, res, next) => {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      throw new ApiError('Username and password are required', 400)
    }

    const user = await Auth.findOne({ where: { username }, include: User })

    if (!user) {
      throw new ApiError('User not found', 404)
    }

    if (user.User.role !== 'Admin') {
      throw new ApiError('You are not an admin', 401)
    }

    if (user && bcrypt.compareSync(password, user.password)) {
      const payload = {
        id: user.id,
        name: user.User.name,
        username: user.username,
        email: user.email,
        phoneNumber: user.User.phoneNumber,
        role: user.User.role,
      }
      const token = jwt.sign(payload, process.env.JWT_SECRET)

      return res.status(200).json({
        status: 'success',
        message: 'Login success',
        token,
        payload,
        role: user.User.role,
      })
    } else {
      return next(new ApiError('Incorrect password', 401))
    }
  } catch (err) {
    next(new ApiError(err.message, 500))
  }
}

const registeringMember = async (req, res, next) => {
  try {
    const { username, password, role, nik, phoneNumber, email } = req.body

    if (!username || !password || !role || !phoneNumber || !email) {
      throw new ApiError('All fields are required', 400)
    }

    // Check if email already exists in the Auth table
    const existingAuth = await Auth.findOne({ where: { email } })

    if (existingAuth) {
      // Find the associated user with the same email
      const existingUser = await User.findByPk(existingAuth.userId)

      // Check if the user is not verified
      if (existingUser && !existingUser.isVerified) {
        // Delete the old unverified user and related data
        await Auth.destroy({ where: { userId: existingUser.id } })
        await VerificationToken.destroy({ where: { userId: existingUser.id } })
        await User.destroy({ where: { id: existingUser.id } })
        console.log(`Old unverified user with email ${email} deleted`)
      } else {
        // If the user is verified, block re-registration
        return res.status(400).json({
          status: 'fail',
          message: 'Email is already verified. Please log in.',
        })
      }
    }

    // Proceed with new registration
    const saltRounds = 10
    const hashedPassword = bcrypt.hashSync(password, saltRounds)

    const user = await User.create({
      name: username,
      nik,
      phoneNumber,
      role,
      email,
    })

    const auth = await Auth.create({
      username,
      email,
      password: hashedPassword,
      userId: user.id,
    })

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '2m',
    })

    await VerificationToken.create({
      userId: user.id,
      token,
      expiresAt: new Date(Date.now() + 120000), // 2 minutes expiration
    })

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASSWORD,
      },
    })

    const verificationUrl = `http://localhost:9000/api/v1/auth/verify?token=${token}`

    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: 'Verify Your Account',
      html: `
      <html>
        <head>
          <style>
            .email-container {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              background-color: #f4f4f4;
              padding: 20px;
              border-radius: 10px;
              max-width: 600px;
              margin: 0 auto;
            }
            .email-header {
              text-align: center;
              padding-bottom: 20px;
            }
            .email-content {
              background-color: #fff;
              padding: 20px;
              border-radius: 10px;
            }
            .email-button {
              display: block;
              width: 200px;
              margin: 20px auto;
              padding: 10px 0;
              background-color: #007bff;
              color: #fff;
              text-align: center;
              border-radius: 5px;
              text-decoration: none;
            }
            .email-footer {
              text-align: center;
              font-size: 12px;
              color: #888;
              padding-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="email-header">
              <h2>Verify Your Account</h2>
            </div>
            <div class="email-content">
              <p>Hello,</p>
              <p>Thank you for registering. Please click the button below to verify your account:</p>
              <a href="${verificationUrl}" class="email-button">Verify Account</a>
              <p>If you did not register, please ignore this email.</p>
              <p>Thank you,</p>
              <p>Support Team</p>
            </div>
            <div class="email-footer">
              <p>&copy; 2024 Your Company. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
      `,
    }

    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        console.error(error)
        return res
          .status(500)
          .json({ message: 'Failed to send verification email' })
      }

      res.status(201).json({
        status: 'success',
        message: 'Register success. Verification email sent.',
        data: {
          auth,
          user,
        },
      })

      // Token expiration and cleanup
      setTimeout(async () => {
        try {
          const userToCheck = await User.findByPk(user.id)

          if (!userToCheck.isVerified) {
            await VerificationToken.destroy({ where: { token } })
            await User.destroy({ where: { id: user.id } })
            await Auth.destroy({ where: { userId: user.id } })

            console.log(
              `Expired token and associated user data deleted for userId: ${user.id}`
            )
          } else {
            await VerificationToken.destroy({ where: { token } })
            console.log(`Expired token deleted for userId: ${user.id}`)
          }
        } catch (err) {
          console.error('Error deleting expired token and user data:', err)
        }
      }, 120000) // 2 minutes
    })
  } catch (err) {
    next(new ApiError(err.message, 500))
  }
}

const verifyUser = async (req, res, next) => {
  try {
    const { token } = req.query

    if (!token) {
      throw new ApiError('Token is required', 400)
    }

    let decoded
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(400).send(`
          <html>
            <head>
              <style>
                body {
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  height: 100vh;
                  background-color: #f4f4f4;
                  font-family: Arial, sans-serif;
                }
                .container {
                  text-align: center;
                  background-color: #fff;
                  padding: 50px;
                  border-radius: 10px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                .container img {
                  width: 100px;
                  margin-bottom: 20px;
                }
                .container h1 {
                  font-size: 24px;
                  color: #ff6347;
                }
                .container h4 {
                  font-size: 16px;
                  color: #ff6347;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <img src="https://cdn-icons-png.flaticon.com/512/6227/6227339.png" alt="Expired Token">
                <h1>Token Expired</h1>
                <h4>Please return to the registration page to re-register</h4>
              </div>
            </body>
          </html>
        `)
      }
      throw new ApiError('Invalid token', 400)
    }

    const userId = decoded.userId

    const verificationToken = await VerificationToken.findOne({
      where: { token, userId },
    })

    if (!verificationToken) {
      throw new ApiError('Invalid or expired token', 400)
    }

    const user = await User.findByPk(userId)

    if (!user) {
      throw new ApiError('User not found', 404)
    }

    user.isVerified = true
    await user.save()

    await VerificationToken.destroy({ where: { token } })

    return res.status(200).send(`
      <html>
        <head>
          <style>
            body {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              background-color: #f4f4f4;
              font-family: Arial, sans-serif;
            }
            .container {
              text-align: center;
              background-color: #fff;
              padding: 50px;
              border-radius: 10px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .container img {
              width: 100px;
              margin-bottom: 20px;
            }
            .container h1 {
              font-size: 24px;
              color: #4caf50;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <img src="https://www.pngall.com/wp-content/uploads/5/Green-Checklist-PNG-Image.png" alt="Verification Successful">
            <h1>Verification Successful</h1>
          </div>
        </body>
      </html>
    `)
  } catch (err) {
    next(new ApiError(err.message, 500))
  }
}

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body
    if (!email) {
      return next(new ApiError('Email is required', 400))
    }
    const user = await Auth.findOne({ where: { email } })
    if (!user) {
      return next(new ApiError('Email Not Found', 404))
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    })
    await PasswordReset.create({
      userId: user.id,
      token,
      expiresAt: new Date(Date.now() + 3600000),
    })

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASSWORD,
      },
    })
    const resetUrl = `http://localhost:5173/reset-password?token=${token}`

    const mailOptions = {
      from: 'your-email@gmail.com',
      to: email,
      subject: 'Reset Password',
      html: `
    <html>
      <head>
        <style>
          .email-container {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f4f4f4;
            padding: 20px;
            border-radius: 10px;
            max-width: 600px;
            margin: 0 auto;
          }
          .email-header {
            text-align: center;
            padding-bottom: 20px;
          }
          .email-content {
            background-color: #fff;
            padding: 20px;
            border-radius: 10px;
          }
          .email-button {
            display: block;
            width: 200px;
            margin: 20px auto;
            padding: 10px 0;
            background-color: #007bff;
            color: #fff;
            text-align: center;
            border-radius: 5px;
            text-decoration: none;
          }
          .email-footer {
            text-align: center;
            font-size: 12px;
            color: #888;
            padding-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="email-header">
            <h2>Reset Password</h2>
          </div>
          <div class="email-content">
            <p>Halo,</p>
            <p>Anda telah meminta untuk mengatur ulang kata sandi Anda. Klik tombol di bawah ini untuk mengatur ulang kata sandi Anda:</p>
            <a href="${resetUrl}" class="email-button">Atur Ulang Kata Sandi</a>
            <p>Jika Anda tidak meminta pengaturan ulang kata sandi, abaikan email ini.</p>
            <p>Terima kasih,</p>
            <p>Tim Support</p>
          </div>
          <div class="email-footer">
            <p>&copy; 2024 Bima Enviro. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `,
    }
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error)
        return res.status(500).json({ message: 'Gagal mengirim email' })
      }
      res.status(201).json({
        status: 'success',
        message: 'Email reset password telah dikirim',
      })
    })
  } catch (err) {
    next(new ApiError(err.message, 500))
  }
}

const resetPassword = async (req, res, next) => {
  try {
    const { token, newPassword } = req.body

    if (!newPassword || typeof newPassword !== 'string') {
      throw new Error('New password is required and must be a string')
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const userId = decoded.userId

    const hashedPassword = await bcrypt.hash(newPassword, 10)
    await Auth.update({ password: hashedPassword }, { where: { id: userId } })

    res.status(200).json({ message: 'Password berhasil direset' })
  } catch (err) {
    next(new ApiError(err.message, 500))
  }
}
const getMe = async (req, res, next) => {
  try {
    return res.status(200).json({
      status: 'success',
      data: {
        id: req.user.id,
        name: req.user.name,
        username: req.user.Auth.username,
        email: req.user.Auth.email,
        phoneNumber: req.user.phoneNumber,
        imageUrl: req.user.imageUrl,
        role: req.user.role,
      },
    })
  } catch (err) {
    next(new ApiError(err.message, 500))
  }
}

const changePassword = async (req, res, next) => {
  const id = req.user.id
  const { password, newPassword, confirmPassword } = req.body
  try {
    const user = await Auth.findOne({
      where: {
        userId: id,
      },
    })
    if (!user) {
      return next(new ApiError('User not found', 404))
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return next(new ApiError('Wrong password', 400))
    }

    if (newPassword !== confirmPassword) {
      return next(new ApiError('Passwords do not match', 400))
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)
    await Auth.update({ password: hashedPassword }, { where: { userId: id } })

    res.status(200).json({ message: 'Change password success' })
  } catch (err) {
    next(new ApiError(err.message, 500))
  }
}

module.exports = {
  login,
  loginAdmin,
  registeringMember,
  verifyUser,
  forgotPassword,
  resetPassword,
  changePassword,
  getMe,
}
