const express = require('express')
const router = express.Router()
const {
  getAllRecipes,
  getRecipe,
  newRecipe,
  createRecipe,
  removeRecipe,
  editRecipe,
  changeRecipe
} = require('../controllers/AllRecipes');

// Returns all recipes
router.get('/', getAllRecipes);

// Returns one recipe with given id
router.get('/:id', getRecipe);

// Creates a new recipe
router.get('/add', newRecipe)
router.post('/add', createRecipe);

// Updates a recipe with given id
// EDIT ROUTE TO MAKE CHANGES
router.get('/:id', editRecipe)
router.put('/:id', changeRecipe);

// Deletes a recipe with given id
router.delete('/:id', removeRecipe);

modules.exports = router