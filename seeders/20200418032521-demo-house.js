"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Houses",
      [
        {
          id: 1,
          name: "House Astina",
          cityId: 1,
          address: "Permata Bintaro Residence Pondok Aren,Tangerang Selatan",
          price: 3000000,
          typeRent: "year",
          ameneties: "Furnished",
          bedRoom: 3,
          bathRoom: 2,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Houses", null, {});
  },
};
