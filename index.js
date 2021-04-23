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
const loginRouter = require('./controllers/login')

app.use('/api/users', userRouter)
app.use('/api/scores', scoreRouter)
app.use('/login', loginRouter)

app.listen(process.env.PORT, () => {
  console.log("Server ready for listening")
})