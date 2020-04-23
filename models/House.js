"use strict";
module.exports = (sequelize, DataTypes) => {
  const House = sequelize.define(
    "House",
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
    },
    {}
  );
  House.associate = function (models) {
    House.belongsTo(models.City);
    House.hasMany(models.transaction);
  };
  return House;
};
