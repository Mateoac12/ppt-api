require('dotenv').config()
const scoreRouter = require('express').Router()
const Score = require('../models/Score')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

scoreRouter.get('/', async (_, response) => {
  const allScores = await Score.find({})
  response.json(allScores)
})

scoreRouter.post('/', async (request, response) => {
  const { score } = request.body
  const authorization = request.get('authorization')

  let token = ''
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    token = authorization.substring(7)
  }

  const decodeToken = jwt.verify(token, process.env.SECRET)

  if (!token || !decodeToken.id) {
    response.status(401).json({
      error: "token missing or invalid"
    })
  }

  const { id: userId } = decodeToken

  const newScore = new Score({
    score,
    date: new Date(),
    user: userId
  })

  const userToUpdate = await User.findById(userId)

  await newScore.save()
    .then(score => {
      userToUpdate.score = userToUpdate.score.concat(newScore)
      userToUpdate.save()

      response.json(score)
    })
    .catch(err => console.error(err))
})

module.exports = scoreRouter
