const { mongo } = require("mongoose");

const mongoose = require('mongoose');
const { model } = require("./user");
const Schema = mongoose.Schema

const Recipe = new Schema({
  title: {
    type: String,
    required: true
  },
  intro: {
    type: String
  },
  cook_minutes: {
    type: Number,
    required: true
  }

})
Recipe.index({ title: 1 })
module.exports = mongoose.model('Recipe', Recipe)