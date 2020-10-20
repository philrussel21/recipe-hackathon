// Don't forget to load the env variables in heroku CLI
// when deploying
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const User = require('../models/user');
const Recipe = require('../models/recipe');
const recipes = require('./recipe.json');
const users = require('./user.json');

const mongoose = require('mongoose');
const dbConnection = "mongodb://localhost/recipes";
mongoose.connect(
  dbConnection,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  (err) => {
    if (err) console.log("Error connecting to database", err);
    else console.log("Connected to database!");
  }
);

User.collection.drop()
Recipe.collection.drop()

async function populate(num) {
  try {
    const user = await User.create(users[num])

    recipes[num].user = user.id
    const recipe = await Recipe.create(recipes[num])
    console.log(recipe)
  } catch (error) {
    console.log(error)
  }
}

for (let index = 0; index < users.length; index++) {
  populate(index)
}
// mongoose.connection.close()
