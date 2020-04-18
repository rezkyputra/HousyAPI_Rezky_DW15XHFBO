"use strict";
module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define(
    "List",
    {
      name: DataTypes.STRING,
    },
    {}
  );
  List.associate = function (models) {
    List.belongsTo(models.User);
  };
  return List;
};
