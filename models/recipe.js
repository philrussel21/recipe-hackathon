const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Recipe = new Schema({
  title: {
    type: String,
    trim: true,
    required: true,
  },
  intro: {
    type: String,
    trim: true,
  },
  cook_minutes: {
    type: Number,
    required: true,
  },
  country: {
    type: String,
    trim: true,
    required: true,
  },
  city: {
    type: String,
    trim: true,
  },
  img: {
    type: String,
    required: true,
  },
  tags: [
    {
      type: String,
      required: true,
    },
  ],
  steps: [
    {
      type: String,
      required: true,
    },
  ],
  ingredients: [
    {
      type: String,
      required: true,
    },
  ],
  // Reference using user id to link recipe
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})
Recipe.index({ title: 1 })
Recipe.index({ city: 1 })
Recipe.index({ country: 1 })
Recipe.index({ tags: 1 })
Recipe.index({ user: 1 })
module.exports = mongoose.model('Recipe', Recipe)

