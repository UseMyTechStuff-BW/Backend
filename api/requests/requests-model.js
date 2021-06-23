const db = require('../data/db-config')

function findById(request_id) {
  return db("requests").where("request_id", request_id).first()
}

function findByOwnerId(owner_id) {
  return db("requests as r")
    .join("equipment as e", "e.equipment_id", "=", "r.equipment_id")
    .select(
      "r.request_id",
      "r.user_id as renter_id",
      "e.equipment_id",
      "r.accepted"
    )
    .where("e.user_id", owner_id)
}

async function add(request) {
  const { user_id, equipment_id } = request
  const existing = await db("requests")
    .where("user_id", user_id)
    .andWhere("equipment_id", equipment_id)
  if (!existing.length > 0) {
    const [request_id] = await db("requests").insert(
      { equipment_id, user_id },
      "request_id"
    )
    return findById(request_id)
  } else {
    return null
  }
}

async function accept(request_id) {
  await db("requests")
    .where("request_id", request_id)
    .update({ accepted: true })
  const request = await findById(request_id)
  await db("equipment")
    .where("equipment_id", request.equipment_id)
    .update({ equipment_available: false })
  return request
}

async function deleteById(request_id) {
  const request = await findById(request_id)
  await db("requests").where("request_id", request_id).del()
  if (request.accepted) {
    await db("equipment")
      .where("equipment_id", request.equipment_id)
      .update({ equipment_available: true })
  }
  return request
}

module.exports = {
  findById,
  findByOwnerId,
  add,
  accept,
  deleteById,
}
