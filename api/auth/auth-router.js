const router = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('../users/users-model')
const tokenBuilder = require('./token-builder')

const {
  validateRoleName,
  checkIfString,
  checkUsernameExists,
  checkRegistration,
  checkUsernameTaken,
  checkLogin,
} = require('./auth-middleware')

router.post(
  "/register",
  checkIfString,
  checkRegistration,
  validateRoleName,
  checkUsernameTaken,
  (req, res, next) => {
    const { username, role, password } = req.body
    const hash = bcrypt.hashSync(password, 8)

    User.add({ username, role, password: hash })
      .then((user) => {
        res.status(201).json(user)
      })
      .catch(next)
  }
)

router.post("/login", checkLogin, checkUsernameExists,  (req, res, next) => {
  if (bcrypt.compareSync(req.body.password, req.user.password)) {
    const token = tokenBuilder(req.user)
    res.status(200).json({
      message: `${req.user.username} is back!`,
      token,
      role: req.user.role
    })
  } else {
    next({
      status: 401,
      message: 'Invalid Credentials'
    })
  }
})

module.exports = router
