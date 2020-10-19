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

async function getUserProfile(req, res) {
  const userEmail = req.params.email
  try {
    const user = await User.findOne({ email: userEmail })
    if (!user) {
      req.flash('error', "User not found")
      return res.status(404).render('404', { error: req.flash('error') })
    } else {

      res.render('users/show', { user })
    }

  } catch (error) {
    res.status(500).send({ message: error })
  }
}

async function editProfile(req, res) {
  const userEmail = req.params.email
  try {
    const user = await User.findOne({ email: userEmail })
    if (!user) {
      req.flash('error', "User not found")
      return res.status(404).render('404', { error: req.flash('error') })
    } else {

      return res.render('users/edit', { user })
    }
  } catch (error) {
    res.status(500).send({ message: error })
  }
}

async function updateProfile(req, res) {
  try {
    const userEmail = req.params.email
    const updatedUser = await User.findOneAndUpdate({ email: userEmail }, req.body, { new: true })
    return res.redirect(`/users/${userEmail}`)
  } catch (error) {
    res.status(500).send({ message: error })
  }
}



module.exports = { getUser, postUser, getRegister, addUser, getUserProfile, editProfile, updateProfile }