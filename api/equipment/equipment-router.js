const express = require('express')
const Equipment = require('./equipment-model')
const { 
  checkRoleOwner, 
  checkPayload,
  restricted, } = require('../middleware')

const router = express.Router()

router.get("/", async (req, res, next) => {
  try {
    const equipment = await Equipment.find()
    res.status(200).json(equipment)
  } catch (err) {
    next(err)
  }
})

router.get("/:equipment_id", async (req, res, next) => {
  try {
    const { equipment_id } = req.params
    const equipment = await Equipment.findById(equipment_id)
    res.status(200).json(equipment)
  } catch (err) {
    next(err)
  }
})

router.post("/", checkPayload, restricted, checkRoleOwner, async (req, res, next) => {
  try {
    const user_id = req.decodedToken.subject
    const { name, imgUrl, description } = req.body
    const equipment = {
      equipment_name: name,
      equipment_description: description,
      equipment_img: imgUrl,
      user_id: user_id,
    }
    const added = await Equipment.add(equipment)
    res.status(201).json(added)
  } catch (err) {
    next(err)
  }
})

router.put("/:equipment_id",
  restricted,
  checkRoleOwner,
  checkPayload,
  async (req, res, next) => {
    try {
      const user_id = req.decodedToken.subject
      const { equipment_id } = req.params
      const { name, imgUrl, description } = req.body
      const existing = await Equipment.findById(equipment_id)
      if (existing && user_id === existing.owner.id) {
        const equipment = {
          equipment_name: name,
          equipment_img: imgUrl,
          equipment_description: description,
        }
        const updated = await Equipment.updateById(equipment_id, equipment)
        res.status(200).json(updated)
      } else if (!existing) {
        res.status(404).json(`equipment with id ${equipment_id} doesn't exist`)
      } else {
        res.status(401).json("user must own the equipment")
      }
    } catch (err) {
      next(err)
    }
  }
)

router.delete(
  "/:equipment_id",
  restricted,
  checkRoleOwner,
  async (req, res, next) => {
    try {
      const user_id = req.decodedToken.subject
      const { equipment_id } = req.params
      let equipment = await Equipment.findById(equipment_id)
      if (equipment && user_id === equipment.owner.id) {
        equipment = await Equipment.deleteById(equipment_id)
        res.status(200).json(equipment)
      } else if (!equipment) {
        res.status(404).json(`equipment with id ${equipment_id} doesn't exist`)
      } else {
        res.status(401).json("user must own the equipment")
      }
    } catch (err) {
      next(err)
    }
  }
)

module.exports = router
