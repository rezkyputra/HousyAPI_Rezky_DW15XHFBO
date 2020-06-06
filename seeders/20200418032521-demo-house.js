"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "houses",
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
          sqft: 900,
          desc:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic pesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
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
