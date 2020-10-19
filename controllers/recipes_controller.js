const {
  allRecipes,
  getRecipeById,
  addRecipe,
  updateRecipe,
  destroyRecipe
} = require('../utils/recipes');

async function getAllRecipes(req, res) {
  try {
    const recipes = await allRecipes()

    res.render('recipes/index', { recipes })
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong with the server",
      error
    })
  }

}

async function getRecipe(req, res) {
  try {
    const recipe = await getRecipeById(req)
    // no document found
    if (!recipe) {
      req.flash('error', "Error: Cannot find recipe")
      res.status(404).render('404', { error: req.flash('error') })
    } else {

      res.render('recipes/show', { recipe })
    }
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong with the server",
      error
    })
  }
}

function newRecipe(req, res) {
  return res.render('recipes/add')
}

async function createRecipe(req, res) {
  try {
    // creates a new document in the recipe db
    const newRecipe = await addRecipe(req).save()
    return res.redirect(`/recipes/${newRecipe.id}`)

  } catch (error) {
    // TEST IF 404 or 500 type of error to show by passing invalid data
    res.send({ error })
  }
}
async function removeRecipe(req, res) {
  try {
    await destroyRecipe(req)
    res.send({
      // responds back to the FE with JSON obj that has the route
      // where to redirect after deleting a comment.
      // not sure if we can change to something or use a plain res.redirect?
      redirect: '/recipes'
      // window.location = res.redirect
    })

  } catch (error) {
    // TEST IF 404 or 500 type of error to show by passing invalid data
    res.send(error)
  }
}

async function editRecipe(req, res) {
  const recipe = await getRecipeById(req)
  res.render('recipes/edit', { recipe })
}

async function changeRecipe(req, res) {
  try {
    const updatedRecipe = await updateRecipe(req)
    // FLASH UPDATED MESSAGE
    return res.redirect(`/recipes/${updatedRecipe.id}`)
  } catch (error) {
    // TEST IF 404 or 500 type of error to show by passing invalid data
    res.send(error)
  }
}

module.exports = {
  getAllRecipes,
  getRecipe,
  newRecipe,
  createRecipe,
  editRecipe,
  removeRecipe,
  changeRecipe
}