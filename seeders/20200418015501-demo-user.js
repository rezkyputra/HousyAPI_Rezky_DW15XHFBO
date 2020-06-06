"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          id: 1,
          fullname: "Rezky Putra Akkif",
          username: "putra",
          email: "rezky@gmail.com",
          password: "123",
          listId: 1,
          gender: "male",
          phone: "082192061400",
          address: "jl Ikhlas",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
