require('dotenv').config()
require('./mongo')

// server
const express = require('express')
const { json } = require('express')
const app = express()
app.use(json())

// routes
const userRouter = require('./controllers/user')
const scoreRouter = require('./controllers/score')

app.use('/api/users', userRouter)
app.use('/api/scores', scoreRouter)

app.listen(process.env.PORT, () => {
  console.log("Server ready for listening")
})