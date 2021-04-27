require('dotenv').config()
const userRouter = require('express').Router()

// password crypting
const bcrypt = require('bcrypt')

// user model
const User = require('../models/user')

userRouter.get('/', async (_, response) => {
  const allUsers = await User.find({}).populate('score', {
    score: 1,
    _id: 0
  })
  response.json(allUsers)
})

userRouter.post('/', async (request, response) => {
  const { username, password } = request.body
  
  const checkUserExist = await User.findOne({ username })

  if (checkUserExist !== null) {
    response.status(401).json({
      error: "imposible create this user"
    })
  }

  const SECURITY = process.env.SECURITY_LEVEL_BCTYPY
  const passwordHash = await bcrypt.hash(password, Number(SECURITY))

  const newUser = new User ({
    username,
    passwordHash
  })

  await newUser.save()
    .then(user => response.json(user))
    .catch(err => console.log(err))
})

module.exports = userRouter
