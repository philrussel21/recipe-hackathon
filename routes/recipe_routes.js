const express = require('express')
const router = express.Router()
const {
  getAllRecipes,
  getRecipe,
  addRecipe,
  createRecipe,
  removeRecipe,
  changeRecipe
} = require('../controllers/AllRecipes');

// Returns all recipes
router.get('/', getAllRecipes);

// Returns one recipe with given id
router.get('/:id', getRecipe);

// Creates a new recipe
router.get('/add', addRecipe)
router.post('/add', createRecipe);

// Updates a recipe with given id
router.put('/:id', changeRecipe);

// Deletes a recipe with given id
router.delete('/:id', removeRecipe);

modules.exports = router