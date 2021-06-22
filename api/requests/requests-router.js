const express = require('express')
const {
  checkRoleRenter,
  checkRoleOwner,
  restricted,
} = require('../middleware')
const Requests = require('./requests-model')
const Equipment = require('../equipment/equipment-model')
const { validateOwnership } = require('./requests-middleware')

const router = express.Router()

router.get("/", restricted, checkRoleOwner, async (req, res, next) => {
  try {
    const user_id = req.decodedToken.subject
    const requests = await Requests.findByOwnerId(user_id)
    res.status(200).json(requests)
  } catch (err) {
    next(err)
  }
})

router.post("/", restricted, checkRoleRenter, async (req, res, next) => {
  try {
    const equipment_id = req.body.equipment_id
    const user_id = req.decodedToken.subject
    const request = { user_id: user_id, equipment_id: equipment_id }
    const added = await Requests.add(request)
    if (!added) {
      res.status(401).json("you've already requested this equipment")
    } else {
      res.status(201).json(added)
    }
  } catch (err) {
    next(err)
  }
})

router.put(
  "/:request_id",
  restricted,
  checkRoleOwner,
  validateOwnership,
  async (req, res, next) => {
    try {
      const { request_id } = req.params
      const { equipment_id } = await Requests.findById(request_id)
      const equipment = await Equipment.findById(equipment_id)
      if (equipment.isAvailable) {
        const updated = await Requests.accept(request_id)
        res.status(200).json(updated)
      } else {
        res.status(401).json("this item is currently in use")
      }
    } catch (err) {
      next(err)
    }
  }
)

router.delete(
  "/:request_id",
  restricted,
  checkRoleOwner,
  validateOwnership,
  async (req, res, next) => {
    try {
      const { request_id } = req.params
      const deleted = await Requests.deleteById(request_id)
      res.status(200).json(deleted)
    } catch (err) {
      next(err)
    }
  },
)

module.exports = router
