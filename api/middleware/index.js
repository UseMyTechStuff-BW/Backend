const { JWT_SECRET } = require('../secrets')
const jwt = require('jsonwebtoken')

const restricted = (req, res, next) => {
  const token = req.headers.authorization

  if (!token) {
    next({ status: 401, message: "token required" })
  }
  jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
    if (err) {
      next({ status: 401, message: "token invalid" })
    } else {
      req.decodedToken = decodedToken
      next()
    }
  })
}

const checkRoleRenter = (req, res, next) => {
  if (!req.decodedToken) {
    res.json("token required from restricted middleware")
  } else {
    if (req.decodedToken.role === "renter") {
      next()
    } else {
      res.status(403).json("Renters only")
    }
  }
}

const checkRoleOwner = (req, res, next) => {
  if (!req.decodedToken) {
    res.json("token required from restricted middleware")
  } else {
    if (req.decodedToken.role === "owner") {
      next()
    } else {
      res.status(403).json("Owners only")
    }
  }
}

const checkPayload = (req, res, next) => {
  if (!req.body.name || !req.body.description || !req.body.imgUrl) {
    next({
      status: 401,
      message: "Name, description, and imgUrl required"
    })
  } else {
    next()
  }
}

module.exports = {
  checkRoleRenter,
  checkRoleOwner,
  restricted,
  checkPayload,
}
