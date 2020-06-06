"use strict";
module.exports = (sequelize, DataTypes) => {
  const house = sequelize.define(
    "house",
    {
      name: DataTypes.STRING,
      cityId: DataTypes.INTEGER,
      address: DataTypes.STRING,
      price: DataTypes.INTEGER,
      typeRent: {
        type: DataTypes.ENUM,
        values: ["day", "month", "year"],
        defaultValue: "year",
      },
      ameneties: {
        type: DataTypes.STRING,
        set(value) {
          return this.setDataValue("ameneties", value.toString());
        },
        get() {
          const data = this.getDataValue("ameneties");
          return data && data.split(",");
        },
      },
      bedRoom: DataTypes.INTEGER,
      bathRoom: DataTypes.INTEGER,
      sqft: DataTypes.INTEGER,
      desc: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {}
  );
  house.associate = function (models) {
    house.belongsTo(models.city);
    house.belongsTo(models.user);
    house.hasMany(models.transaction);
  };
  return house;
};
