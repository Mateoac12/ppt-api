const scoreRouter = require('express').Router()
const Score = require('../models/Score')

scoreRouter.get('/', async (_, response) => {
  const allScores = await Score.find({})
  response.json(allScores)
})

scoreRouter.post('/', async (request, response) => {
  const { score } = request.body

  const newScore = new Score({
    score,
    date: new Date()
  })

  await newScore.save()
    .then(score => response.json(score))
    .catch(err => console.error(err))
})

module.exports = scoreRouter
