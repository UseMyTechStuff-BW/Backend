const Requests = require('./requests-model')
const Equipment = require('../equipment/equipment-model')

const validateOwnership = async (req, res, next) => {
  const user_id = req.decodedToken.subject
  const { request_id } = req.params
  const request = await Requests.findById(request_id)
  const equipment = await Equipment.findById(request.equipment_id)
  if (equipment.owner.id === user_id) {
    next()
  } else {
    res.status(401).json("you must own this equipment")
  }
}

module.exports = { validateOwnership }
