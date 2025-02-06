const { RESTDataSource } = require("apollo-datasource-rest");

const userData = [
  { id: "1", name: "John" },
  { id: "2", name: "Sarah" },
  { id: "3", name: "Bob" }
];

const itemData = [{ name: "Item1" }, { name: "Item2" }, { name: "Item3" }];

// Example Data Source Logic
class UserAPI extends RESTDataSource {
  getUsers() {
    return userData;
  }

  getUserById(id) {
    return userData.find((user) => user.id === id);
  }

  getItems() {
    return itemData;
  }
}

module.exports = UserAPI;
