const {
  P2h,
  P2hUser,
  AroundUnit,
  MachineRoom,
  User,
  InTheCabin,
  Location,
  Kkh,
  Vehicle,
} = require('../models')
const { Sequelize, Op } = require('sequelize')
const ApiError = require('../../utils/apiError')

const createP2hDt = async (req, res, next) => {
  const {
    bdbr,
    kai,
    kot,
    sohd,
    fd,
    bbcmin,
    badtu,
    kas,
    tg,
    ba,
    g2,
    sc,
    ka,
    ac,
    fb,
    fs,
    fsb,
    fsl,
    frl,
    fm,
    fwdaw,
    fh,
    feapar,
    fkp,
    ftd,
    frk,
    krk,
    ar,
    oe,
    modelu,
    nou,
    shift,
    time,
    earlyhm,
    endhm,
    earlykm,
    endkm,
    kbj,
    idVehicle,
    ntsAroundU,
    ntsInTheCabinU,
    ntsMachineRoom,
  } = req.body

  try {
    const aroundUnit = await AroundUnit.create({
      bdbr,
      kai,
      kot,
      sohd,
      fd,
      bbcmin,
      badtu,
      kas,
      tg,
      ba,
      g2,
      sc,
      ka,
    })

    const inTheCabin = await InTheCabin.create({
      ac,
      fb,
      fs,
      fsb,
      fsl,
      frl,
      fm,
      fwdaw,
      fh,
      feapar,
      fkp,
      ftd,
      frk,
      krk,
    })

    const machineRoom = await MachineRoom.create({
      ar,
      oe,
    })

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

    const p2h = await P2h.create({
      idAroundUnit: aroundUnit.id,
      idInTheCabin: inTheCabin.id,
      idMachineRoom: machineRoom.id,
      idVehicle,
      modelu,
      nou,
      date: formattedDate,
      shift,
      time,
      earlyhm,
      endhm,
      earlykm,
      endkm,
      kbj,
      ntsAroundU,
      ntsInTheCabinU,
      ntsMachineRoom,
    })

    const p2hUser = await P2hUser.create({
      p2hId: p2h.id,
      userId: req.user.id,
      name: req.user.name,
    })

    return res
      .status(201)
      .json({ status: 'success', message: 'P2h created', p2h, p2hUser })
  } catch (err) {
    next(new ApiError(err.message, 500))
  }
}

const createP2hBul = async (req, res, next) => {
  const {
    ku,
    kai,
    lotk,
    lodk,
    lopk,
    lohk,
    fd,
    bbcmin,
    kasa,
    kba,
    ba,
    ka,
    ac,
    fs,
    fsb,
    fsl,
    frl,
    fm,
    fwdaw,
    fkp,
    fh,
    feapar,
    frk,
    krk,
    ar,
    oe,
    modelu,
    nou,
    shift,
    time,
    earlyhm,
    endhm,
    kbj,
    jobsite,
    location,
    idVehicle,
    ntsAroundU,
    ntsInTheCabinU,
    ntsMachineRoom,
  } = req.body
  try {
    const aroundUnit = await AroundUnit.create({
      ku,
      kai,
      lotk,
      lodk,
      lopk,
      lohk,
      fd,
      bbcmin,
      kasa,
      kba,
      ba,
      ka,
    })
    const inTheCabin = await InTheCabin.create({
      ac,
      fs,
      fsb,
      fsl,
      frl,
      fm,
      fwdaw,
      fkp,
      fh,
      feapar,
      frk,
      krk,
    })
    const machineRoom = await MachineRoom.create({
      ar,
      oe,
    })
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

    const p2h = await P2h.create({
      idAroundUnit: aroundUnit.id,
      idInTheCabin: inTheCabin.id,
      idMachineRoom: machineRoom.id,
      idVehicle,
      modelu,
      nou,
      date: formattedDate,
      shift,
      time,
      earlyhm,
      endhm,
      kbj,
      jobsite,
      location,
      ntsAroundU,
      ntsInTheCabinU,
      ntsMachineRoom,
    })

    const p2hUser = await P2hUser.create({
      p2hId: p2h.id,
      userId: req.user.id,
      name: req.user.name,
    })

    return res.status(201).json({
      status: 'success',
      message: 'P2h created',
      p2h,
      p2hUser,
      aroundUnit,
      inTheCabin,
      machineRoom,
    })
  } catch (err) {
    next(new ApiError(err.message, 500))
  }
}

const createP2hLv = async (req, res, next) => {
  const {
    bdbr,
    kai,
    kot,
    tb4m,
    bbcmin,
    kasa,
    sc,
    g2,
    dong,
    kr,
    ba,
    kso,
    ka,
    ac,
    fb,
    fs,
    fsb,
    fsl,
    frl,
    fm,
    fwadw,
    fkp,
    fh,
    feapar,
    frk,
    krk,
    gps,
    icc,
    ar,
    oe,
    os,
    fba,
    modelu,
    nou,
    shift,
    time,
    earlykm,
    endkm,
    kbj,
    jobsite,
    location,
    idVehicle,
    ntsAroundU,
    ntsInTheCabinU,
    ntsMachineRoom,
  } = req.body

  try {
    const aroundUnit = await AroundUnit.create({
      bdbr,
      kai,
      kot,
      tb4m,
      bbcmin,
      kasa,
      sc,
      g2,
      dong,
      kr,
      ba,
      kso,
      ka,
    })
    const inTheCabin = await InTheCabin.create({
      ac,
      fb,
      fs,
      fsb,
      fsl,
      frl,
      fm,
      fwadw,
      fkp,
      fh,
      feapar,
      frk,
      krk,
      gps,
      icc,
    })
    const machineRoom = await MachineRoom.create({
      ar,
      oe,
      os,
      fba,
    })

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

    const p2h = await P2h.create({
      idAroundUnit: aroundUnit.id,
      idInTheCabin: inTheCabin.id,
      idMachineRoom: machineRoom.id,
      idVehicle,
      modelu,
      nou,
      date: formattedDate,
      shift,
      time,
      earlykm,
      endkm,
      kbj,
      jobsite,
      location,
      ntsAroundU,
      ntsInTheCabinU,
      ntsMachineRoom,
    })

    const p2hUser = await P2hUser.create({
      p2hId: p2h.id,
      userId: req.user.id,
      name: req.user.name,
    })

    return res.status(201).json({
      status: 'success',
      message: 'P2h created',
      p2h,
      p2hUser,
    })
  } catch (err) {
    next(new ApiError(err.message, 500))
  }
}

const createP2hBus = async (req, res, next) => {
  const {
    bdbr,
    kai,
    kot,
    ops,
    bbcmin,
    kasa,
    sk,
    g2,
    sc,
    ba,
    kso,
    ka,
    ac,
    apk,
    fb,
    fs,
    fsb,
    fsl,
    frl,
    fm,
    fwdaw,
    fkp,
    fh,
    feapar,
    frk,
    krk,
    ar,
    oe,
    fba,
    modelu,
    nou,
    shift,
    time,
    earlykm,
    endkm,
    kbj,
    jobsite,
    location,
    idVehicle,
    ntsAroundU,
    ntsInTheCabinU,
    ntsMachineRoom,
  } = req.body

  try {
    const aroundUnit = await AroundUnit.create({
      bdbr,
      kai,
      kot,
      ops,
      bbcmin,
      kasa,
      sk,
      g2,
      sc,
      ba,
      kso,
      ka,
    })

    const inTheCabin = await InTheCabin.create({
      ac,
      apk,
      fb,
      fs,
      fsb,
      fsl,
      frl,
      fm,
      fwdaw,
      fkp,
      fh,
      feapar,
      frk,
      krk,
    })

    const machineRoom = await MachineRoom.create({
      ar,
      oe,
      fba,
    })

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

    const p2h = await P2h.create({
      idAroundUnit: aroundUnit.id,
      idInTheCabin: inTheCabin.id,
      idMachineRoom: machineRoom.id,
      idVehicle,
      modelu,
      nou,
      date: formattedDate,
      shift,
      time,
      earlykm,
      endkm,
      kbj,
      jobsite,
      location,
      ntsAroundU,
      ntsInTheCabinU,
      ntsMachineRoom,
    })

    const p2hUser = await P2hUser.create({
      p2hId: p2h.id,
      userId: req.user.id,
      name: req.user.name,
    })

    return res.status(201).json({
      status: 'success',
      message: 'P2h created',
      p2h,
      p2hUser,
    })
  } catch (err) {
    next(new ApiError(err.message, 500))
  }
}

const createP2hEx = async (req, res, next) => {
  const {
    ku,
    kai,
    kogb,
    los,
    loh,
    fd,
    bbcmin,
    badtu,
    kasa,
    kba,
    at,
    lpb,
    lptdkk,
    ka,
    ac,
    fs,
    fsb,
    fsl,
    frl,
    fm,
    fwdaw,
    fh,
    feapar,
    fkp,
    frk,
    krk,
    ar,
    oe,
    modelu,
    nou,
    shift,
    time,
    earlyhm,
    endhm,
    kbj,
    idVehicle,
    ntsAroundU,
    ntsInTheCabinU,
    ntsMachineRoom,
  } = req.body

  try {
    const aroundUnit = await AroundUnit.create({
      ku,
      kai,
      kogb,
      los,
      loh,
      fd,
      bbcmin,
      badtu,
      kasa,
      kba,
      at,
      lpb,
      lptdkk,
      ka,
    })

    const inTheCabin = await InTheCabin.create({
      ac,
      fs,
      fsb,
      fsl,
      frl,
      fm,
      fwdaw,
      fh,
      feapar,
      fkp,
      frk,
      krk,
    })

    const machineRoom = await MachineRoom.create({
      ar,
      oe,
    })

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

    const p2h = await P2h.create({
      idAroundUnit: aroundUnit.id,
      idInTheCabin: inTheCabin.id,
      idMachineRoom: machineRoom.id,
      idVehicle,
      modelu,
      nou,
      date: formattedDate,
      shift,
      time,
      earlyhm,
      endhm,
      kbj,
      ntsAroundU,
      ntsInTheCabinU,
      ntsMachineRoom,
    })

    const p2hUser = await P2hUser.create({
      p2hId: p2h.id,
      userId: req.user.id,
      name: req.user.name,
    })

    return res.status(201).json({
      status: 'success',
      message: 'P2h created',
      p2h,
      p2hUser,
    })
  } catch (err) {
    next(new ApiError(err.message, 500))
  }
}

const createLocation = async (req, res, next) => {
  const { pit, disposal, location, fuel, fuelhm } = req.body
  try {
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

    const lokasi = await Location.create({
      userId: req.user.id,
      date: formattedDate,
      pit,
      disposal,
      location,
      fuel,
      fuelhm,
    })

    return res.status(201).json({
      status: 'success',
      message: 'Location created',
      lokasi,
    })
  } catch (err) {
    next(new ApiError(err.message, 500))
  }
}

const getAllP2h = async (req, res, next) => {
  try {
    const p2h = await P2hUser.findAll({
      order: [['createdAt', 'DESC']],
      include: [{ model: P2h, include: [{ model: Vehicle }] }, { model: User }],
    })
    res.status(200).json({
      status: 'success',
      p2h,
    })
  } catch (err) {
    next(new ApiError(err.message, 500))
  }
}

const getAllData = async (req, res, next) => {
  try {
    const [p2hData, kkhData] = await Promise.all([P2h.findAll(), Kkh.findAll()])

    res.status(200).json({
      status: 'success',
      p2hData: p2hData.length,
      kkhData: kkhData.length,
    })
  } catch (err) {
    next(new ApiError(err.message, 500))
  }
}

const getP2hByVehicle = async (req, res, next) => {
  const { id } = req.params
  try {
    const p2h = await P2h.findAll({
      where: {
        idVehicle: id,
      },
      include: { model: Vehicle, model: AroundUnit },
    })
    res.status(200).json({
      status: 'success',
      p2h,
    })
  } catch (err) {
    next(new ApiError(err.message, 500))
  }
}

const getAllP2hGroupedByMonth = async (req, res, next) => {
  try {
    const year = new Date().getFullYear()

    const months = Array.from({ length: 12 }, (_, index) => ({
      month: index + 1,
      name: new Date(year, index).toLocaleString('default', { month: 'long' }),
    }))

    const p2hData = await P2h.findAll({
      attributes: [
        [Sequelize.literal('EXTRACT(MONTH FROM "createdAt")'), 'month'],
        [Sequelize.fn('COUNT', Sequelize.col('id')), 'count'],
      ],
      where: Sequelize.literal(`EXTRACT(YEAR FROM "createdAt") = ${year}`),
      group: [Sequelize.literal('EXTRACT(MONTH FROM "createdAt")')],
      order: [Sequelize.literal('EXTRACT(MONTH FROM "createdAt") ASC')],
      raw: true,
    })

    const result = {}

    p2hData.forEach((item) => {
      const monthName = months.find(
        (m) => m.month === parseInt(item.month)
      )?.name
      if (monthName) {
        result[monthName] = parseInt(item.count)
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

const getAllP2hForThisAndLastWeek = async (req, res, next) => {
  try {
    const today = new Date()
    const startOfThisWeek = new Date(
      today.setDate(today.getDate() - today.getDay())
    )
    const startOfLastWeek = new Date(
      today.setDate(today.getDate() - today.getDay() - 7)
    )

    const p2hData = await P2hUser.findAll({
      attributes: [
        [Sequelize.fn('DATE', Sequelize.col('createdAt')), 'date'],
        [Sequelize.fn('COUNT', Sequelize.col('id')), 'count'],
      ],
      where: {
        createdAt: {
          [Op.gte]: startOfLastWeek,
        },
      },
      group: [Sequelize.fn('DATE', Sequelize.col('createdAt'))],
      order: [[Sequelize.fn('DATE', Sequelize.col('createdAt')), 'ASC']],
      raw: true,
    })

    const result = {
      thisWeek: {},
      lastWeek: {},
    }

    // Array of Indonesian day names
    const daysInIndonesian = [
      'Minggu',
      'Senin',
      'Selasa',
      'Rabu',
      'Kamis',
      'Jumat',
      'Sabtu',
    ]

    const addDays = (date, days) => {
      const result = new Date(date)
      result.setDate(result.getDate() + days)
      return result
    }

    for (let i = 0; i < 7; i++) {
      const dateThisWeek = addDays(startOfThisWeek, i)
      const dateLastWeek = addDays(startOfLastWeek, i)
      const dayIndexThisWeek = dateThisWeek.getDay() // Get day index (0-6)
      const dayIndexLastWeek = dateLastWeek.getDay() // Get day index (0-6)
      const dayNameThisWeek = daysInIndonesian[dayIndexThisWeek] // Get day name
      const dayNameLastWeek = daysInIndonesian[dayIndexLastWeek] // Get day name
      result.thisWeek[dayNameThisWeek] = 0
      result.lastWeek[dayNameLastWeek] = 0
    }

    p2hData.forEach((item) => {
      const dayName = daysInIndonesian[new Date(item.date).getDay()] // Get day name
      if (new Date(item.date) >= startOfThisWeek) {
        result.thisWeek[dayName] = item.count
      } else {
        result.lastWeek[dayName] = item.count
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

const validateAdmin = async (req, res, next) => {
  const { id } = req.params
  try {
    const p2h = await P2hUser.findOne({ where: { id } })

    if (!p2h) {
      return next(new ApiError('P2H not found', 404))
    }

    await P2hUser.update({ aValidation: true }, { where: { id } })

    res.status(200).json({
      status: 'success',
      message: 'Validated successfully',
    })
  } catch (err) {
    next(new ApiError(err.message, 500))
  }
}

const getLastCreatedByUser = async (req, res, next) => {
  try {
    const lastP2h = await P2hUser.findOne({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']],
      include: { model: P2h },
    })

    if (!lastP2h) {
      return next(new ApiError('No P2h found for this user', 404))
    }

    res.status(200).json({
      status: 'success',
      lastP2h,
    })
  } catch (err) {
    next(new ApiError(err.message, 500))
  }
}

const getLength = async (req, res, next) => {
  try {
    const count = await P2h.count()
    res.status(200).json({ length: count })
  } catch (err) {
    next(new ApiError(err.message, 500))
  }
}

module.exports = {
  createP2hDt,
  createP2hBul,
  createP2hLv,
  createP2hBus,
  createP2hEx,
  createLocation,
  getAllP2h,
  getAllData,
  getP2hByVehicle,
  getAllP2hGroupedByMonth,
  getAllP2hForThisAndLastWeek,
  validateAdmin,
  getLastCreatedByUser,
  getLength,
}
