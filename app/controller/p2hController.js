const {
  P2h,
  P2hUser,
  AroundUnit,
  MachineRoom,
  User,
  InTheCabin,
  Location,

  Timesheet,
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

    const formattedDate = `${day} ${month} ${year}`

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

    const formattedDate = `${day} ${month} ${year}`
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
    const formattedDate = `${day} ${month} ${year}`

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
    const formattedDate = `${day} ${month} ${year}`

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
    pit,
    disposal,
    location,
    fuel,
    fuelhm,
    idVehicle,
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

    const lokasi = await Location.create({
      pit,
      disposal,
      location,
      fuel,
      fuelhm,
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
    const formattedDate = `${day} ${month} ${year}`

    const p2h = await P2h.create({
      idAroundUnit: aroundUnit.id,
      idInTheCabin: inTheCabin.id,
      idMachineRoom: machineRoom.id,
      idLocation: lokasi.id,
      idVehicle,
      modelu,
      nou,
      date: formattedDate,
      shift,
      time,
      earlyhm,
      endhm,
      kbj,
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

const getAllP2h = async (req, res, next) => {
  try {
    const p2h = await P2hUser.findAll({
      include: [{ model: P2h }, { model: User }],
    })
    res.status(200).json({
      status: 'success',
      p2h,
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
      include: { model: Vehicle },
    })
    res.status(200).json({
      status: 'success',
      p2h,
    })
  } catch (err) {
    next(new ApiError(err.message, 500))
  }
}

const getP2hByDate = async (req, res, next) => {
  const { date } = req.params
  try {
    const p2h = await P2h.findAll({
      where: {
        date,
      },
      include: {
        model: Vehicle,
      },
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
    const p2hData = await P2hUser.findAll({
      attributes: [
        [Sequelize.literal('EXTRACT(MONTH FROM "createdAt")'), 'month'],
        [Sequelize.fn('COUNT', Sequelize.col('id')), 'count'],
      ],
      group: [Sequelize.literal('EXTRACT(MONTH FROM "createdAt")')],
      order: [Sequelize.literal('EXTRACT(MONTH FROM "createdAt")')],
      raw: true,
    })

    const result = {}
    const months = Array.from({ length: 12 }, (_, index) => ({
      month: index + 1,
      name: new Date(2020, index).toLocaleString('default', { month: 'long' }),
    }))

    // Mengisi hasil dari query ke dalam objek hasil
    p2hData.forEach((item) => {
      const monthName = months.find((m) => m.month === item.month)?.name
      if (monthName) {
        result[monthName] = item.count
      }
    })

    // Inisialisasi nilai 0 untuk setiap bulan yang belum memiliki data
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

    const addDays = (date, days) => {
      const result = new Date(date)
      result.setDate(result.getDate() + days)
      return result
    }

    // Inisialisasi data untuk minggu ini dan minggu lalu
    for (let i = 0; i < 7; i++) {
      const dateThisWeek = addDays(startOfThisWeek, i)
      const dateLastWeek = addDays(startOfLastWeek, i)
      const dateStringThisWeek = dateThisWeek.toISOString().split('T')[0]
      const dateStringLastWeek = dateLastWeek.toISOString().split('T')[0]
      result.thisWeek[dateStringThisWeek] = 0
      result.lastWeek[dateStringLastWeek] = 0
    }

    // Mengisi hasil dari query ke dalam objek hasil
    p2hData.forEach((item) => {
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
  createP2hDt,
  createP2hBul,
  createP2hLv,
  createP2hBus,
  createP2hEx,
  getAllP2h,
  getP2hByVehicle,
  getP2hByDate,
  getAllP2hGroupedByMonth,
  getAllP2hForThisAndLastWeek,
}
