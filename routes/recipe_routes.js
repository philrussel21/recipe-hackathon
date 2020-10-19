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
} = require('../controllers/recipes_controller');

// Returns all recipes
router.get('/', getAllRecipes);

// Creates a new recipe
router.get('/new', newRecipe)
router.post('/', createRecipe);

// Returns one recipe with given id
router.get('/:id', getRecipe);

// Updates a recipe with given id
// EDIT ROUTE TO MAKE CHANGES
router.get('/:id/edit', editRecipe)
router.put('/:id', changeRecipe);

// Deletes a recipe with given id
router.delete('/:id', removeRecipe);

module.exports = router