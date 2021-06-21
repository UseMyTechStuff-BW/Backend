const router = require('express').Router()
const Equipment = require('../equipment/equipment-model')

const {
  checkRoleRenter,
  checkRoleOwner,
  restricted,
} = require('../middleware')

router.get("/owner", restricted, checkRoleOwner, async (req, res, next) => {
  try {
    const user_id = req.decodedToken.subject
    const equipment = await Equipment.findOwned(user_id)
    res.status(201).json(equipment)
  } catch (err) {
    next(err)
  }
})

router.get("/renter", restricted, checkRoleRenter, async (req, res, next) => {
  try {
    const user_id = req.decodedToken.subject
    const equipment = await Equipment.findRented(user_id)
    res.status(201).json(equipment)
  } catch (err) {
    next(err)
  }
})

module.exports = router
