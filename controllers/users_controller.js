const User = require('../models/user')


function getUser(req, res) {
  // TODO adds error message (if any ) to flash
  res.render('users/login')
}
function postUser(req, res) {

}

function getRegister(req, res) {
  // TODO: Add flash messages for taken emails
  res.render('users/register')
}

async function addUser(req, res) {
  try {
    // checks existing email on database
    const user = await User.findOne({ email: req.body.email })
    if (user) {
      // TODO: more checks on password length etc?
      // TODO: Adds error message to flash
      res.redirect('/users/register')
    }
    else {
      const newUser = await User.create(req.body)
      console.log(newUser)
      req.flash('success', "Succesfully created an account. Please login")
      res.redirect('/users/login')
    }
  } catch (error) {
    res.status(500).send({ message: error })
  }
}

function getUserProfile(req, res) {

}


module.exports = { getUser, postUser, getRegister, addUser, getUserProfile }