// Don't forget to load the env variables in heroku CLI
// when deploying
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRoutes = require("./routes/users_routes");
const recipeRoutes = require("./routes/recipe_routes");
const exphbs = require("express-handlebars");
// allows handlebars to reference properties of prototyped db objects/documents
const Handlebars = require("handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");

// Passport components
const flash = require("express-flash");
const session = require("express-session");
const passport = require("passport");
const initPassport = require("./config/passport");

// AUTH and PASSPORT components here
initPassport(passport);
const MongoStore = require("connect-mongo")(session);
app.use(
  session({
    secret: process.env.SECRET_SESSION, // .env
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: {
      expires: 3_600_000,
    },
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// uses the host-issued port if live
const port = process.env.PORT || 3000;

const dbConnection = "mongodb://localhost/recipes";
// Set three properties to avoid deprecation warnings:
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

const server = app.listen(port, () => {
  console.log("listening on port:" + port);
});

// access public dir for stylesheets and scripts
app.use(express.static("public"));

// gives access to req.body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// handlebars template engine
app.set("views", __dirname + "/views");
app.engine(
  "handlebars",
  exphbs({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  })
);
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  // TODO: edit when passport is implemented
  const user = req.user || "World!";
  res.render("index", { user });
});

app.use("/users", userRoutes);
app.use("/recipes", recipeRoutes);

app.use((req, res) => {
  res.status(404).send({
    message: "ERROR: Page not found",
  });
});

module.exports = { app, server };
