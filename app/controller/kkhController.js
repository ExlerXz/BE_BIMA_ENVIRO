const { Kkh } = require('../models')
const ApiError = require('../../utils/apiError')

const path = require('path')
const imagekit = require('../lib/imagekit')
const { Sequelize, Op } = require('sequelize')

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

const getAllKkhGroupedByMonth = async (req, res, next) => {
  try {
    const year = new Date().getFullYear()

    const kkhData = await Kkh.findAll({
      attributes: [
        [Sequelize.literal('EXTRACT(MONTH FROM "createdAt")'), 'month'],
        [Sequelize.fn('COUNT', Sequelize.col('id')), 'count'],
      ],
      where: Sequelize.literal(`EXTRACT(YEAR FROM "createdAt") = ${year}`),
      group: [Sequelize.literal('EXTRACT(MONTH FROM "createdAt")')],
      order: [Sequelize.literal('EXTRACT(MONTH FROM "createdAt") ASC')], // Memastikan pengurutan dari bulan Januari sampai Desember
      raw: true,
    })

    const result = {}
    const months = Array.from({ length: 12 }, (_, index) => ({
      month: index + 1,
      name: new Date(year, index).toLocaleString('default', { month: 'long' }),
    }))

    kkhData.forEach((item) => {
      const monthName = months.find(
        (m) => m.month === parseInt(item.month)
      )?.name
      if (monthName) {
        result[monthName] = item.count
      }
    })

    months.forEach((month) => {
      if (!result[month.name]) {
        result[month.name] = 0
      }
    })

    res.status(200).json({
      status: 'success',
      data: result,
    })
  } catch (err) {
    next(new ApiError(err.message, 500))
  }
}

const getAllKkhForThisAndLastWeek = async (req, res, next) => {
  try {
    const today = new Date()
    const startOfThisWeek = new Date(
      today.setDate(today.getDate() - today.getDay())
    )
    const startOfLastWeek = new Date(
      today.setDate(today.getDate() - today.getDay() - 7)
    )

    const kkhData = await Kkh.findAll({
      attributes: [
        [Sequelize.fn('DATE', Sequelize.col('updatedAt')), 'date'],
        [Sequelize.fn('COUNT', Sequelize.col('id')), 'count'],
      ],
      where: {
        updatedAt: {
          [Op.gte]: startOfLastWeek,
        },
      },
      group: [Sequelize.fn('DATE', Sequelize.col('updatedAt'))],
      order: [[Sequelize.fn('DATE', Sequelize.col('updatedAt')), 'ASC']],
      raw: true,
    })

    const result = {
      thisWeek: {},
      lastWeek: {},
    }

    const addDays = (date, days) => {
      const result = new Date(date)
      result.setDate(result.getDate() + days)
      return result
    }

    for (let i = 0; i < 7; i++) {
      const dateThisWeek = addDays(startOfThisWeek, i)
      const dateLastWeek = addDays(startOfLastWeek, i)
      const dateStringThisWeek = dateThisWeek.toISOString().split('T')[0]
      const dateStringLastWeek = dateLastWeek.toISOString().split('T')[0]
      result.thisWeek[dateStringThisWeek] = 0
      result.lastWeek[dateStringLastWeek] = 0
    }

    kkhData.forEach((item) => {
      const dateString = new Date(item.date).toISOString().split('T')[0]
      if (new Date(item.date) >= startOfThisWeek) {
        result.thisWeek[dateString] = item.count
      } else {
        result.lastWeek[dateString] = item.count
      }
    })

    res.status(200).json({
      status: 'success',
      data: result,
    })
  } catch (err) {
    next(new ApiError(err.message, 500))
  }
}

module.exports = {
  createKkh,
  getAllKkh,
  getKkhById,
  getAllKkhGroupedByMonth,
  getAllKkhForThisAndLastWeek,
}
