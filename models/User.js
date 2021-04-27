const mongoose = require('mongoose')
const { model, Schema } = mongoose

const userSchema = Schema({
  username: {
    type: String,
    unique: true
  },
  passwordHash: String,
  score: [{
    type: Schema.Types.ObjectId,
    ref: 'Score'
  }]
})

userSchema.set('toJSON', {
  transform: (_, recivedObject) => {
    recivedObject.id = recivedObject._id,
    delete recivedObject._id,
    delete recivedObject.__v
  }
})

const User = model('User', userSchema)

module.exports = User
