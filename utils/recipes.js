const Recipe = require("../models/recipe");
const User = require("../models/user");

function allRecipes(req) {
  return Recipe.find().populate("user", "username email");
}

function qRecipes(req) {
  const category = req.body.category
  const q = req.body.q
  if (category === 'title') {
    return Recipe.find({ title: `${q}` })
  } else if (category === 'country') {
    return Recipe.find({ country: `${q}` })
  } else {
    return Recipe.find({ tags: `${q}` })
  }
}

function getRecipeById(req) {
  const recipeId = req.params.id;
  return Recipe.findById(recipeId);
}

function addRecipe(req) {
  req.body.user = req.user.id;
  req.body.ingredients = req.body.ingredients.split(",");
  req.body.steps = req.body.steps.split(",");
  req.body.tags = req.body.tags.split(",");
  req.body.cook_minutes = parseInt(req.body.cook_minutes);
  return new Recipe(req.body);
}

function updateRecipe(req) {
  const recipeId = req.params.id;
  req.body.user = req.user.id;
  return Recipe.findByIdAndUpdate(recipeId, req.body, { new: true });
}

function destroyRecipe(req) {
  const recipeId = req.params.id;
  return Recipe.findByIdAndDelete(recipeId);
}

module.exports = {
  allRecipes,
  qRecipes,
  getRecipeById,
  addRecipe,
  updateRecipe,
  destroyRecipe,
};
