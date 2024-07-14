const { Kkh } = require('../models')
const ApiError = require('../../utils/apiError')

const path = require('path')
const imagekit = require('../lib/imagekit')
const { where } = require('sequelize')

const createKkh = async (req, res, next) => {
  const kkhBody = req.body
  const { bedtime, wakeuptime } = kkhBody
  const file = req.file
  let imageUrl
  try {
    if (file) {
      const filename = file.originalname
      const extension = path.extname(filename)
      const uploadImage = await imagekit.upload({
        file: file.buffer,
        fileName: `IMG-${Date.now()}.${extension}`,
      })
      imageUrl = uploadImage.url
    }
    if (!bedtime || !wakeuptime) {
      throw new ApiError('bedTime and wakeuptime are required', 400)
    }
    const currentDate = new Date()
    const day = currentDate.getDate()
    const monthNames = [
      'Januari',
      'Februari',
      'Maret',
      'April',
      'Mei',
      'Juni',
      'Juli',
      'Agustus',
      'September',
      'Oktober',
      'November',
      'Desember',
    ]
    const monthIndex = currentDate.getMonth()
    const month = monthNames[monthIndex]
    const year = currentDate.getFullYear()
    const formattedDate = `${day} ${month} ${year}`

    const [bedtimeHours, bedtimeMinutes] = bedtime.split(':').map(Number)
    const [wakeuptimeHours, wakeuptimeMinutes] = wakeuptime
      .split(':')
      .map(Number)

    const bedtimeInMinutes = bedtimeHours * 60 + bedtimeMinutes
    const wakeuptimeInMinutes = wakeuptimeHours * 60 + wakeuptimeMinutes

    let totalMinutes
    if (wakeuptimeInMinutes >= bedtimeInMinutes) {
      totalMinutes = wakeuptimeInMinutes - bedtimeInMinutes
    } else {
      totalMinutes = 1440 - bedtimeInMinutes + wakeuptimeInMinutes
    }

    const totalHours = Math.floor(totalMinutes / 60)
    const remainingMinutes = totalMinutes % 60
    const totaltime = `${totalHours} hours ${remainingMinutes} minutes`

    const kkh = await Kkh.create({
      userId: req.user.id,
      date: formattedDate,
      totaltime: totaltime,
      wValidation: true,
      ...kkhBody,
      imageUrl,
    })
    res.status(201).json({
      status: 'success',
      kkh,
    })
  } catch (err) {
    next(new ApiError(err.message, 500))
  }
}

const getAllKkh = async (req, res, next) => {
  try {
    const kkh = await Kkh.findAll({
      order: [['createdAt', 'DESC']],
    })
    res.status(200).json({
      status: 'success',
      kkh,
    })
  } catch (err) {
    next(new ApiError(err.message, 500))
  }
}

const getKkhById = async (req, res, next) => {
  try {
    const kkh = await Kkh.findAll({
      order: [['createdAt', 'DESC']],
      where: {
        userId: req.user.id,
      },
    })
    if (kkh.length == 0) {
      return next(new ApiError('kkh not found', 404))
    }
    res.status(200).json({
      status: 'success',
      kkh,
    })
  } catch (err) {
    next(new ApiError(err.message, 500))
  }
}

module.exports = { createKkh, getAllKkh, getKkhById }
