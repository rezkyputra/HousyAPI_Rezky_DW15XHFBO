"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      fullName: DataTypes.STRING,
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      listId: DataTypes.INTEGER,
      gender: {
        type: DataTypes.ENUM,
        values: ["male", "female"],
        defauldValue: "male",
      },
      address: DataTypes.STRING,
    },
    {}
  );
  User.associate = function (models) {
    User.belongsTo(models.List);
    User.hasMany(models.House);
    User.hasMany(models.transaction);
  };
  return User;
};
