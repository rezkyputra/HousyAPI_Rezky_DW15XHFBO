"use strict";
module.exports = (sequelize, DataTypes) => {
  const transaction = sequelize.define(
    "transaction",
    {
      checkin: DataTypes.DATE,
      checkout: DataTypes.DATE,
      stay: DataTypes.INTEGER,
      houseId: DataTypes.INTEGER,
      total: DataTypes.INTEGER,
      status: {
        type: DataTypes.ENUM,
        values: ["waiting payment", "waiting approve", "cancel", "approve"],
        defauldValue: "waiting payment",
      },
      attachment: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      fromId: DataTypes.INTEGER,
    },
    {}
  );
  transaction.associate = function (models) {
    transaction.belongsTo(models.House);
    transaction.belongsTo(models.User);
  };
  return transaction;
};
