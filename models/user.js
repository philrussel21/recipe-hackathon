const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    bcrypt: true
  },
  intro: {
    type: String
  }
})

User.index({ 'email': 1 })
User.plugin(require('mongoose-bcrypt'))

module.exports = mongoose.model("User", User)
