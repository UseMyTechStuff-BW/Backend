exports.seed = function (knex) {
    return knex("requests")
      .del()
      .then(function () {
        return knex("requests").insert([
          { equipment_id: 1, user_id: 1, accepted: false },
          { equipment_id: 3, user_id: 3, accepted: true },
          { equipment_id: 2, user_id: 3, accepted: true },
        ])
      })
}