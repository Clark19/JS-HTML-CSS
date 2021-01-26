const person1 = {
  name: "n1",
  job: {
    t: "sw e",
    manager: {
      name: "bob",
    },
  },
};

const person2 = {
  name: "Bob",
};

function print(person) {
  console.log(person.job.manager.name);
}
print(person1);
print(person);
