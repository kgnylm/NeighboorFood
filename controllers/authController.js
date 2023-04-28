const { promisify } = require('util')
const jwt = require('jsonwebtoken')
const User = require('./../models/userModel')
const catchAsync = require('./../utils/catchAsync')
const AppError = require('./../utils/appError')

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })
}

exports.signup = catchAsync(async (req, res, next) => {
  const body = Object.keys(req.body)[0]
  const fixedResponse = body.replace(/'/g, '"')
  const parsedResponse = JSON.parse(fixedResponse)
  try {
    const newUser = await User.create({
      name: parsedResponse.enteredName,
      surname: parsedResponse.enteredSurname,
      email: parsedResponse.enteredEmail,
      password: parsedResponse.enteredPassword,
    })
    const token = signToken(newUser._id)

    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: newUser,
      },
    })
  } catch (err) {
    console.log(err)
  }
})

exports.login = catchAsync(async (req, res, next) => {
  const body = Object.keys(req.body)[0]
  const fixedResponse = body.replace(/'/g, '"')
  const parsedResponse = JSON.parse(fixedResponse)
  const { email, password } = parsedResponse
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400))
  }
  const user = await User.findOne({ email }).select('+password')
  const correct = await user.correctPassword(password, user.password)
  if (!user || !correct) {
    return next(new AppError('Incorrect email or password', 401))
  }
  const token = signToken(user._id)
  res.status(200).json({
    status: 'success',
    token,
    uid : user._id,
  })
})

exports.protect = catchAsync(async (req, res, next) => {
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    )
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

  const currentUser = await User.findById(decoded.id)
  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401
      )
    )
  }

  req.user = currentUser
  next()
})

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      )
    }

    next()
  }
}
