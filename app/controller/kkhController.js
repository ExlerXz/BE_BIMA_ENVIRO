const { Kkh } = require('../models')
const ApiError = require('../../utils/apiError')

const path = require('path')
const imagekit = require('../lib/imagekit')
const { Sequelize, Op } = require('sequelize')

const createKkh = async (req, res, next) => {
  const kkhBody = req.body
  const { totaltime } = kkhBody
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

    if (!totaltime) {
      throw new ApiError('bedTime and wakeuptime are required', 400)
    }

    const timeParts = totaltime.match(/(\d+)\s*Jam\s*(\d+)?\s*Menit/)
    if (!timeParts) {
      throw new ApiError('Invalid totaltime format', 400)
    }

    const hours = parseInt(timeParts[1], 10)
    const minutes = parseInt(timeParts[2] || 0, 10)
    const totalHours = hours + minutes / 60

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
    const dayNames = [
      'Minggu',
      'Senin',
      'Selasa',
      'Rabu',
      'Kamis',
      'Jumat',
      'Sabtu',
    ]
    const dayOfWeek = currentDate.getDay()
    const dayName = dayNames[dayOfWeek]

    const formattedDate = `${dayName}, ${day} ${month} ${year}`

    let complaint

    if (totalHours >= 6) {
      complaint = 'Fit to work'
    } else if (totalHours < 6 && totalHours >= 4) {
      complaint = 'On Monitoring'
    } else {
      complaint = 'Kurang Tidur'
    }

    if (dayOfWeek === 5 && totalHours >= 4.5) {
      complaint = 'Fit to work'
    } else if (dayOfWeek === 5 && totalHours < 4) {
      complaint = 'On Monitoring'
    }

    const kkh = await Kkh.create({
      userId: req.user.id,
      date: formattedDate,
      totaltime: totaltime,
      wValidation: true,
      imageUrl,
      complaint,
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

    // Function to get day initials
    const getDayInitial = (date) => {
      const days = [
        'Minggu',
        'Senin',
        'Selasa',
        'Rabu',
        'Kamis',
        'Jumat',
        'Sabtu',
      ]
      return days[date.getDay()]
    }

    for (let i = 0; i < 7; i++) {
      const dateThisWeek = addDays(startOfThisWeek, i)
      const dateLastWeek = addDays(startOfLastWeek, i)
      const dayThisWeek = getDayInitial(dateThisWeek)
      const dayLastWeek = getDayInitial(dateLastWeek)

      result.thisWeek[dayThisWeek] = 0
      result.lastWeek[dayLastWeek] = 0
    }

    kkhData.forEach((item) => {
      const dateString = new Date(item.date)
      const dayString = getDayInitial(dateString)

      if (dateString >= startOfThisWeek) {
        result.thisWeek[dayString] = item.count
      } else {
        result.lastWeek[dayString] = item.count
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
