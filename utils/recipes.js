const Recipe = require('../models/recipe');
const User = require('../models/user');

function allRecipes(req) {
  return Recipe.find()
}

function getRecipeById(req) {
  const recipeId = req.params.id
  return Recipe.findById(recipeId)
}

function addRecipe(req) {
  req.body.user = req.user.id
  return new Recipe(req.body)
}

function updateRecipe(req) {
  const recipeId = req.params.id
  req.body.user = req.user.id
  return Recipe.findByIdAndUpdate(recipeId, req.body, { new: true })
}

function destroyRecipe(req) {
  const recipeId = req.params.id
  return Recipe.findByIdAndDelete(recipeId)
}

module.exports = {
  allRecipes,
  getRecipeById,
  addRecipe,
  updateRecipe,
  destroyRecipe
}