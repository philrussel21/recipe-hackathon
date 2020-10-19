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
  },
  // Reference using ID to link users to recipes
  recipes: [{
    type: Schema.Types.ObjectId,
    ref: 'Recipes'
  }]
})

User.index({ 'email': 1 })
User.plugin(require('mongoose-bcrypt'))

module.exports = mongoose.model("User", User)
