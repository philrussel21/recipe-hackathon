const express = require("express");
const router = express.Router();
const {
  getAllRecipes,
  getRecipe,
  newRecipe,
  createRecipe,
  removeRecipe,
  editRecipe,
  changeRecipe
} = require('../controllers/recipes_controller');
const { checkAuthenticated } = require('../middlewares/auth');


// Returns all recipes
router.get('/', getAllRecipes);

// Creates a new recipe
router.get('/new', checkAuthenticated, newRecipe)
router.post('/', checkAuthenticated, createRecipe);

// Returns one recipe with given id
router.get('/:id', getRecipe);

// Updates a recipe with given id
router.get('/:id/edit', checkAuthenticated, editRecipe)
router.put('/:id', checkAuthenticated, changeRecipe);

// Deletes a recipe with given id
router.delete("/:id", checkAuthenticated, removeRecipe);

module.exports = router;
