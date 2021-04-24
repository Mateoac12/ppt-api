require('dotenv').config()
const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')
var jwt = require('jsonwebtoken');

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({ username })

  const correctPassword = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(correctPassword && user)) response.status(401).json({
    error: "don't possible login"
  })

  const userForToken = {
    id: user._id,
    username: user.username
  }

  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: '7d'
  })

  response.json({
    username: user.username,
    token
  })
})

module.exports = loginRouter