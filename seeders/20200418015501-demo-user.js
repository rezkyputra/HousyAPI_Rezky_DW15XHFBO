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
          address: "jl Ikhlas",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          fullName: "Muhammad Akhsan",
          username: "Akhsan",
          email: "akhsan@gamil.com",
          password: "123",
          listId: 2,
          gender: "male",
          address: "Jl Rappang",
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
