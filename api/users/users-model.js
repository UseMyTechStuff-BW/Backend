const db = require('../data/db-config')

function find() {
  return db("users").select("user_id", "username", "role")
}

function findBy(filter) {
  return db("users")
    .select("user_id", "password", "username", "role")
    .whereRaw(`LOWER(username) LIKE ?`, [`%${filter.username}%`])
}

function findById(user_id) {
  return db("users")
    .select("user_id", "username", "role")
    .where("user_id", user_id)
    .first()
}

async function add(user) {
  const [user_id] = await db("users").insert(user, "user_id")
  return findById(user_id)
}

module.exports = {
  add,
  findById,
  find,
  findBy,
}
