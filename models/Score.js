const mongoose = require('mongoose')
const { model, Schema } = mongoose

const scoreSchema = new Schema({
  score: Number,
  date: Date,
  user: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
})

scoreSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject.__id,
    delete returnedObject.__id,
    delete returnedObject.__v
  }
})

const Score = model('Score', scoreSchema)

module.exports = Score
