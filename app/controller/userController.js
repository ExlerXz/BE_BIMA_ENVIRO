const { User, Auth } = require('../models')
const ApiError = require('../../utils/apiError')
const path = require('path')
const imagekit = require('../lib/imagekit')
const { where } = require('sequelize')

const getAllUser = async (req, res, next) => {
  try {
    const users = await User.findAll({
      include: Auth,
    })
    return res.status(200).json({ status: 'success', users })
  } catch (err) {
    next(new ApiError(err.message, 500))
  }
}

const getById = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.user.id,
      },
      include: Auth,
    })

    res.status(200).json({
      status: 'success',
      user,
    })
  } catch (err) {
    next(new ApiError(err.message, 500))
  }
}

const updateUser = async (req, res, next) => {
  const id = req.user.id
  const user = await User.findOne({
    where: {
      id,
    },
  })
  const userBody = req.body
  const condition = { where: { id }, returning: true }
  const file = req.file
  let imageUrl
  try {
    if (!user) {
      return next(new ApiError('User not found', 404))
    }

    if (file) {
      const filename = file.originalname
      const extension = path.extname(filename)
      const uploadImage = await imagekit.upload({
        file: file.buffer,
        fileName: `IMG-${Date.now()}.${extension}`,
      })
      imageUrl = uploadImage.url
    }

    const updatedUser = await User.update({ ...userBody, imageUrl }, condition)

    if (userBody.username || userBody.email) {
      const authUpdateData = {}
      if (userBody.username) authUpdateData.username = userBody.username
      if (userBody.email) authUpdateData.email = userBody.email

      await Auth.update({ ...authUpdateData }, { where: { userId: id } })
    }
    res.status(200).json({ user: updatedUser[1][0] })
  } catch (err) {
    next(new ApiError(err.message, 500))
  }
}

const deleteMember = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.id,
      },
    })

    if (!user) {
      return next(new ApiError('The user with this Id was not found', 404))
    }

    await User.destroy({
      where: {
        id: req.params.id,
      },
    })
    await Auth.destroy({
      where: {
        userId: req.params.id,
      },
    })

    res.status(200).json({
      status: 'Success',
      message: 'Deleted successfully',
    })
  } catch (err) {
    next(new ApiError(err.message, 500))
  }
}

module.exports = { getAllUser, getById, updateUser, deleteMember }
