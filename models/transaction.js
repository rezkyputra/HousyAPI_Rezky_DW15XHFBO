"use strict";
module.exports = (sequelize, DataTypes) => {
  const transaction = sequelize.define(
    "transaction",
    {
      checkin: DataTypes.DATE,
      checkout: DataTypes.DATE,
      houseId: DataTypes.INTEGER,
      total: DataTypes.INTEGER,
      status: {
        type: DataTypes.ENUM,
        values: ["waiting payment", "pending", "cancel"],
        defauldValue: "waiting payment",
      },
      attachment: DataTypes.STRING,
    },
    {}
  );
  transaction.associate = function (models) {
    transaction.belongsTo(models.House);
    // transaction.belongsTo(models.User);
  };
  return transaction;
};