const { Auth, User, PasswordReset, VerificationToken } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')

const ApiError = require('../../utils/apiError')

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      throw new ApiError('Username and password are required', 400)
    }

    const user = await Auth.findOne({ where: { username }, include: User })
    if (!user) {
      throw new ApiError('User not found', 404)
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
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1h',
      })

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
    const { username, password, role, phoneNumber, email } = req.body

    if (!username || !password || !role || !phoneNumber || !email) {
      throw new ApiError('All fields are required', 400)
    }

    const saltRounds = 10
    const hashedPassword = bcrypt.hashSync(password, saltRounds)

    const user = await User.create({
      name: username,
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
      expiresIn: '1h',
    })

    await VerificationToken.create({
      userId: user.id,
      token,
      expiresAt: new Date(Date.now() + 3600000),
    })

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASSWORD,
      },
    })

    const verificationUrl = `https://b4b1-114-122-197-11.ngrok-free.app/api/v1/auth/verify?token=${token}`

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

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error)
        return res
          .status(500)
          .json({ message: 'Failed to send verification email' })
      }
      res.status(200).json({
        status: 'success',
        message: 'Register success. Verification email sent.',
        data: {
          auth,
          user,
        },
      })
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

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
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
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAACUCAMAAAD26AbpAAABCFBMVEX///8AzzFV/Xxm/oogtURS/HmE/6Fy/pNe/YNP/Hcou0tU23RY/X42xVhb/YFv/pBGz2Zg5H97/5qA/51u7owAzil795j1//f7//wAxzEAwjIArDTQ/tpJ/HMAzR4AywDb/uMAtjPp+u2Z/6/o/+0AvDMApjQ8/Gsj0kEkrkSn/rrJ89JJ2GLY8t4AqCBTwGkhnj+n6rUniD44q1O58MPI/9SP/qi0/sS9/ssAmzWL5pyW6KMz1VFp3XeC45Bw34Gd2qp6zIpqxny14r+U2qI8t1Z5v4dIxWUAjS1Mn1+uzbUejz0AdSifyKkcdTIGZSNpknERXyogxk1rp3g/fEzO4dJNgVnA38c24CEnAAAKfElEQVR4nO2cCXeaXBrHg8Qt7hjkxighQBMjEmPqFjVxSTK+79im03Zm+v2/ydwFFIggEpDMOfzr6WkV4fnxLPe5F/DoKFKkSJEiRYoUKVKkSJEiRdpXosKFbcKHBOQRdTEGYZvxAamdCc/yj2LYdngW12nxLEXxT/+3kaRMGxCA4ltK2JYAUVUVJFXk9gnqToPHBCU5MNNcSFRm83b7+FzX8Wt7PlNcRbb4yCIA6uIpaCNtxanP8+Pb21tk+Ebwf+i9xbPoHN6gQ/EIgKU6B7LXKk7tLl5NtpsEQW4WM9WeQh1R2AXspHtAqw0Su3MH+3WK25v5s7o9NwRciCBBJpxEVmftkx326xTH7Rd1yx66LRxEFJ/Z9mngEuevx8cnJ9a4WeezheL4dW5Nbm6MSykkeAxjOACzHLTfIGj0ZW65mM9foOaLdu7SynF+MjPtQpyyGkErBADueXluAoAl9Fk1n2URFqr2jQni9vXPJiXU1gVFCMIopurc4IFfJ8h8uy0hxskl2hoh3Dw8/EPfstsgacBSITQV4HlpOP/Ledem2mhbq915+xgj39zc3f319z/Ru1xHSwMqDAJxdvIrB3WSgx5YvjjaT8SpL0voiWNIcLdaffsuwkSmNAI2BAL16SSn6ddyJrtrhYA6W54jhNXq/u3Hv/48aR6ATUUIBO3cmuBln+ZefLlCCPdvbz9/nOtBxGcCM9RWysYF031nJ+riYXV///bz7TJMgu4vnWDppaX5/jd0wtuZHkXs4Uc0oKwJ5t4aAvX3219fNgQH7ypAt5grQvPh33tlgVHiYuODjOCnda6kLHNFpNyvrucA6E70PKDOZj7a5k7CVCfw3hd32TUB9e3f//HROjcSp0VN3gk6/IZg9fPHfw/LwI1aBOBR8LoL0LnYEDz8fHv79vugFamjEUw9+wB0NgDs1Q9YXe+/fffTxB0S9CjyPMMFm8aOoopofLi/X63++Gmko7inYjEDVex4XfM0ErBF9fs9AlitvvpqppM6GazWyPOqbYfaEDSUI/AbA3y9m/lopZOUKUF49LyHjqGaUigYOQTw9etr+zArF9yYEHhfKOkaqilPlrwUBAA1P0hVUjQCz6msGAmm2pszBLAseuoX9xU3IgQjr42RMjEQrK8giIvcEg32nne7h2qZElSm5DWMlJZhQGgJm/eLpMwFnw3giSCMPQatmDEQUIawEUekUI8Cz4ZaCxGUpoK3r4vamiPR2PiRQAqdwTEBaVQiTvD2be7pYgPAmhe9AKl0raCvEcqZjzgBGAn4ouUqjuaGoC/udDBByaMTjEMay1onmkCrdQFfHJmWTkulU49lo2to7Vj+vaVdUimmW77qn9TSKVSp4unLxgGB4p/ehzw3JYkW6DrA4BQjDLx8V84YihHf2jaEdYgbgowkTsIIp14STnw0ELATYds2KqnYQS7PC31M0Pcw+oCRcUCgbGYapFhMA6xJvQpGGGw/vqh0Oh3BBq9rJLBdwG4Shp5P9m4RSYXT2rbPlPFjazKZtMZb+zTBUIxga2R3mnsEIbhk4JqnlQp8Ce8/EkcTqkG0raCIht4OyrYmy1Nc8oIboGUJ2l85ld6f5029bDTYzPsoGRkJHG5N4PoY4SmwjlvoVxDCu1TgRrzJxIx1g47xY6crmqCJEbw2kbtVSyAEZmh5WzQXG2ikpf8wjWnsxGFoB0OMUNmabX6oV8Gy7F+cWgjgPMCUDqYRgXK+P6RGCob1LPmmIZNAEszvPl6wlJVhagglMDZ+zjrfrCZUAkUAgzIi6AuWo04pqxuohmE6ppgInMIIStZGHv+tx+KaCKFsRTgC+nXvrecaTEwf7mjT5T5k2FIxfJKGIL0fl+TMu1haR/zUMMuh2F1XBGUJF73mwRHMXSjSenWlY3JOQ9hxDIJQaQa0BuCAcKRaGPTFCblFnRnAds72xPAQjmTWHEt8BrmBG50hrXN5p2WiBI9RYYJDYMpQ2xGMi9WEAZWe7qRareoIrH1vtBZGSJTDQQBjcyjxj2jUq1YxA4bgXSzmyxpCYOmMEJh3RVWTaEkHXjiafYEiDGewxXYxJ5b7gSKAAUawjs5rmVohtGgtHl9eXq4hKDeL1kICIwQ1tIEhDqSyXQ8GxubC2licnxsYXN1oIuAWJjCEox7DlBkmaTstlM0TG6p6hW6OxBBfqu5unq3hNqwcWJtXSzAQImm//7EZ4excY4AU1YWb8AZaJxlYsy0gBCZpX/G4ljmjv1xdrSFcrUoAUvTsKsbHJUoYYcvEU5dyYXHDA4G4rM5cHYHrIwLG4QgfFNdMIoSEwwm1uuFBYzhxVyXlMi56QdVUqEEyySSTSYdIVSzt3vndA6K4fXZ3gB6OIyawgoTqBQRIFhxOErC4oXr3ACGu2i4bhiYqeQwTWDZDPycKiCHhYFDX7AXqanV393Dl0glHqGrDPwFe9eSkJHaDYL+Jtc2orlZ3D+/ukreRUEA+YCRfjLXRAHuBbjps0rFmw8r9HS4DjOAw8PggGSMUCg4VQ5hYxrfVyu29UlwZp0Iy2IttZcyQcsg3MLLMo8/v3TphSJyQ8MVSWw3oAhQtObjB0rBS7MKlE4CWaQGWVCSxgOU0NHCPpoUj9w/m1MoYgQn6iTwJu6HgVDSMPTd/4fpOB9DUakXQj9cKJJKc3KBONi7Y43aEGlPYVbH9Eehr2eBwcvV1Yraxxz0hsAHDBE479km1Ak2jl8P1sGfyjCP7uM8V9loBOaEQZHOhi5NSNFTKoV/l0IU1ltrr7ijRhXd9E3IDYnBYun3iKX7S3SstSbU+iBPWbqAL9kdTLvg97+UXaK3SHeZpfyFJ3EDbHg5c7PlcDGAIQfDlSNOAuCFve8rAno80cP0UBkgF2uCZjpggDCmfRiEwIJGZCrg7MkpIQdHwNfSDAQxpckYOFkZIw3wKq9DzgaGX1BAOFkZInBTXGD5eBGsFLSwPMiRsJCdjGCH/YefrBHmntZ1AJJezhKH+sTtvanXNBwcnQGdPY8gPvAcAN4A1gUYvp9Y3MPUgQx6mdT7ref1QbpKMSuXpMAigH+KxPFbW40p0LaEVtnwqwPvAHNVLxTUG2sP1PThLI6GYitFhEcDTmEpnsWKxvWe8QiKr+SAbUhQRyUmNIZuu21wJtfmiFIcEKJVSsXKov8ADZyrxuA5BN90+OC80aS0E89lYP1wCyNBM1WNE6XqhKewuTqLQLKS1QpCPpT5Qkn1TLVmPryFS/aHg+CMSwrBP14njoAvSTHiJbJQspXVHxNLpbMGWghMG/UI+DQFiJPTizbCDSBeoMfW0DhFPp2MpRhrUTIkBxNpAStIQUfdYLFZnap/oR+XAIF+H1ulKp9P1ejzFJCSp2WxKUoKh4Rt1g/mQJebLZMNPwRytbyAQR90go/XIU3Gnq12hSR4kstDWdNoEYpJmfz2VGHyWJLBI7EkoYNJrbaGArqKl3if+VUIO1szY9fV1ervq19dZWK8+wUjgJMCJtSaDMOobf8B/wjeuY8lmbcePzn0eicJQYuh8XA+oPF2Whi5G7k8nwMmyIAjyfr+/GClSpEiRIkWKFClSpEiRTPofaNxLXyyzqtMAAAAASUVORK5CYII=" alt="Verified">
            <h1>Verified Successfully</h1>
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
      throw new ApiError('Email is required', 400)
    }
    const user = await Auth.findOne({ where: { email } })
    if (!user) {
      throw new ApiError('Email Not Found', 404)
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
      service: 'gmail',
      auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASSWORD,
      },
    })
    const resetUrl = `http://your-frontend-url/reset-password?token=${token}`

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
      res.status(200).json({ message: 'Email reset password telah dikirim' })
    })
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
      },
    })
  } catch (err) {
    next(new ApiError(err.message, 500))
  }
}

module.exports = {
  login,
  registeringMember,
  verifyUser,
  forgotPassword,
  getMe,
}
