const bcrypt = require("bcryptjs")

exports.seed = function (knex) {
  return knex("users")
    .del()
    .then(function () {
      return knex("users").insert([
        {
          username: "Sonic",
          password: bcrypt.hashSync("1234", 8),
          role: "renter",
        },
        {
          username: "Mario",
          password: bcrypt.hashSync("1234", 8),
          role: "owner",
        },
        {
          username: "Luigi",
          password: bcrypt.hashSync("1234", 8),
          role: "renter",
        },
      ])
    })
}
