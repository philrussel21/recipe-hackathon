const express = require('express')
const router = express.Router()
const passport = require('passport');
const { getUser, postUser, getRegister, addUser, getUserProfile } = require('../controllers/users_controller')
const { checkAuthenticated, checkNotAuthenticated } = require('../middlewares/auth');

router.get('/login', checkNotAuthenticated, getUser)

router.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  // TODO: Edit redirect
  successRedirect: '/',
  failureRedirect: '/users/login',
  failureFlash: true
}))

router.get('/register', checkNotAuthenticated, getRegister)

router.post('/register', checkNotAuthenticated, addUser)

router.get('/logout', checkAuthenticated, (req, res) => {
  req.logOut()
  // TODO flash message
  res.redirect('/')
})

router.get('/:email', getUserProfile)

module.exports = router