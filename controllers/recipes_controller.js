const {
  allRecipes,
  getRecipeById,
  addRecipe,
  updateRecipe,
  destroyRecipe,
} = require("../utils/recipes");

async function getAllRecipes(req, res) {
  try {
    const recipes = await allRecipes();
    const user = req.user || null
    res.render("recipes/index", { recipes, user });
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong with the server",
      error,
    });
  }
}

async function getRecipe(req, res) {
  try {
    const recipe = await getRecipeById(req);
    // no document found
    if (!recipe) {
      req.flash("error", "Error: Cannot find recipe");
      res.status(404).render("404", { error: req.flash("error") });
    } else {
      res.render("recipes/show", { recipe, user: req.user });
    }
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong with the server",
      error,
    });
  }
}

function newRecipe(req, res) {
  const user = req.user
  return res.render("recipes/add", { user });
}

async function createRecipe(req, res) {
  try {
    // creates a new document in the recipe db
    const newRecipe = await addRecipe(req).save()
    return res.redirect(`/recipes/${newRecipe.id}`)

  } catch (error) {
    // TEST IF 404 or 500 type of error to show by passing invalid data
    res.send({ error: "Not saving" })
  }
}
async function removeRecipe(req, res) {
  try {
    await destroyRecipe(req)
    res.send({
      // redirects to homepage after deletion
      redirectUrl: "/recipes",
    });
  } catch (error) {
    // TEST IF 404 or 500 type of error to show by passing invalid data
    res.status(500).send(error);
  }
}

async function editRecipe(req, res) {
  try {
    const recipe = await getRecipeById(req)
    if (!recipe) {
      req.flash('error', "Recipe not found")
      res.status(404).render('404', { error: req.flash('error') })
    } else {
      const user = req.user
      return res.render('recipes/edit', { recipe, user })
    }
  } catch (error) {
    res.status(500).send(error)
  }
}

async function changeRecipe(req, res) {
  try {
    const updatedRecipe = await updateRecipe(req);
    // // FLASH UPDATED MESSAGE
    res.send({ redirectUrl: `/recipes/${updatedRecipe.id}` })
  } catch (error) {
    // TEST IF 404 or 500 type of error to show by passing invalid data
    res.status(500).send(error);
  }
}

module.exports = {
  getAllRecipes,
  getRecipe,
  newRecipe,
  createRecipe,
  editRecipe,
  removeRecipe,
  changeRecipe,
};
