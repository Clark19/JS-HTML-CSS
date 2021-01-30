let { users, boards } = require("./models");

let data = { name: "박진화", age: 4 };
// users.create(data).then((result) => console.log(result.toJSON()));
let name = "박정태";
let age = 26;
let where = { name };
let defaults = { name, age };
users.findOrCreate({ where, defaults }).spread((user, created) => {
  console.log(user.toJSON());
  console.log(`created: ${created}`);
});
