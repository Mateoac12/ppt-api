const loginRouter = require('express').Router()

const bcrypt = require('bcrypt')

const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({ username })

  const correctPassword = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(correctPassword && user)) response.status(401).json({
    error: "don't possible login"
  })

  response.json(user)
})

module.exports = loginRouter