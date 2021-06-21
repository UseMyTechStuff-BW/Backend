const db = require('../data/db-config')

async function find() {
  const equipmentList = await db("equipment as e")
    .join("users as u", "e.user_id", "=", "u.user_id")
    .select(
      "u.user_id",
      "u.username",
      "e.equipment_id",
      "e.equipment_name",
      "e.equipment_img",
      "e.equipment_description",
      "e.equipment_available"
    )

  const result = equipmentList.map((equipment) => {
    return {
      owner: { id: equipment.user_id, username: equipment.username },
      id: equipment.equipment_id,
      name: equipment.equipment_name,
      imgUrl: equipment.equipment_img,
      description: equipment.equipment_description,
      isAvailable: equipment.equipment_available,
    }
  })

  return result
}

async function findById(equipment_id) {
  const equipment = await db("equipment as e")
    .join("users as u", "e.user_id", "=", "u.user_id")
    .select(
      "u.user_id",
      "u.username",
      "e.equipment_id",
      "e.equipment_name",
      "e.equipment_img",
      "e.equipment_description",
      "e.equipment_available"
    )
    .where("equipment_id", equipment_id)
    .first()

  return {
    owner: { id: equipment.user_id, username: equipment.username },
    id: equipment.equipment_id,
    name: equipment.equipment_name,
    imgUrl: equipment.equipment_img,
    description: equipment.equipment_description,
    isAvailable: equipment.equipment_available,
  }
}

async function findOwned(owner_id) {
  return db("equipment as e")
    .select(
      "equipment_id",
      "equipment_name",
      "equipment_description",
      "equipment_img",
      "equipment_available"
    )
    .where("e.user_id", owner_id)
}

async function findRented(renter_id) {
  const equipmentList = await db("equipment as e")
    .join("requests as r", "e.equipment_id", "=", "r.equipment_id")
    .join("users as u", "e.user_id", "=", "u.user_id")
    .select(
      "u.user_id",
      "u.username",
      "e.equipment_id",
      "e.equipment_name",
      "e.equipment_img",
      "e.equipment_description",
      "e.equipment_available"
    )
    .where("r.user_id", renter_id)
    .andWhere("r.accepted", true)

  const result = equipmentList.map((equipment) => {
    return {
      owner: { id: equipment.user_id, username: equipment.username },
      id: equipment.equipment_id,
      name: equipment.equipment_name,
      imgUrl: equipment.equipment_img,
      description: equipment.equipment_description,
      isAvailable: equipment.equipment_available,
    }
  })

  return result
}

async function add(equipment) {
  const [equipment_id] = await db("equipment").insert(
    equipment,
    "equipment_id"
  )
  return findById(equipment_id)
}

async function deleteById(equipment_id) {
  const equipment = await findById(equipment_id)
  await db("equipment").where("equipment_id", equipment_id).del()
  return equipment
}

async function updateById(equipment_id, changes) {
  await db("equipment").where("equipment_id", equipment_id).update(changes)
  return findById(equipment_id)
}

module.exports = {
  find,
  findById,
  findRented,
  findOwned,
  add,
  deleteById,
  updateById,
}