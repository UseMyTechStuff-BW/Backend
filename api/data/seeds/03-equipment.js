exports.seed = function (knex) {
    return knex("equipment")
      .del()
      .then(function () {
        return knex("equipment").insert([
          {
            equipment_name: "EVO Gimbal SS GoPro Hero Session 5",
            equipment_description: "like new, great for adventure",
            equipment_img:
              "https://images.unsplash.com/photo-1503071866712-4af2112f609b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
            equipment_available: true,
            user_id: 2,
          },
          {
            equipment_name: "Pioneer DJ",
            equipment_description: "mix music with ease",
            equipment_img:
              "https://images.unsplash.com/photo-1619597361832-a568b1e0555f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
            equipment_available: false,
            user_id: 2,
          },
          {
            equipment_name: "Astro A50 Gaming Headset",
            equipment_description: "enhance every game you play",
            equipment_img:
              "https://images.unsplash.com/photo-1616081118936-562f7c13d9ca?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
            equipment_available: false,
            user_id: 2,
          },
        ])
      })
}