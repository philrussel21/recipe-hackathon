const { mongo } = require("mongoose");

const mongoose = require('mongoose');
const { type } = require("os");
const { model } = require("./user");
const Schema = mongoose.Schema

const Recipe = new Schema({
  title: {
    type: String,
    trim: true,
    required: true
  },
  intro: {
    type: String,
    trim: true
  },
  cook_minutes: {
    type: Number,
    required: true
  },
  country: {
    type: String,
    trim: true,
    required: true
  },
  city: {
    type: String,
    trim: true
  },
  img: {
    type: String,
    required: true
  },
  tags: {
    type: [String],
    required: true,
  },
  steps: {
    type: [String],
    required: true
  },
  ingredients: {
    type: [String],
    required: true
  },
  // Reference using id to link recipe
  // user: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Users'
  // }
})
Recipe.index({ title: 1 })
module.exports = mongoose.model('Recipe', Recipe)