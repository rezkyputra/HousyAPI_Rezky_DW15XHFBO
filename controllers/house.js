const { House, City } = require("../models");
const { Op } = require("sequelize");

exports.index = async (req, res) => {
  try {
    if (req.query.typeRent && req.query.belowPrice) {
      const houses = await House.findAll({
        include: [
          {
            model: City,
            attributes: ["id", "name"],
          },
        ],
        where: {
          [Op.and]: [
            { typeRent: { [Op.eq]: req.query.typeRent } },
            { price: { [Op.lt]: req.query.belowPrice } },
          ],
        },
        attributes: { exclude: ["createdAt", "updatedAt", "CityId"] },
      });
      res.send({ data: houses });
    } else if (req.query.typeRent || req.query.belowPrice) {
      const houses = await House.findAll({
        include: [
          {
            model: City,
            attributes: ["id", "name"],
          },
        ],
        where: {
          [Op.or]: [
            { typeRent: { [Op.eq]: req.query.typeRent } },
            { price: { [Op.lt]: req.query.belowPrice } },
          ],
        },
        attributes: { exclude: ["createdAt", "updatedAt", "CityId"] },
      });

      res.send({ data: houses });
    } else {
      const houses = await House.findAll({
        include: [
          {
            model: City,
            attributes: ["id", "name"],
          },
        ],
        attributes: { exclude: ["createdAt", "updatedAt", "CityId"] },
      });

      res.send({ data: houses });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.show = async (req, res) => {
  try {
    const house = await House.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: City,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "cityId", "CityId"],
      },
    });
    res.send({ data: house });
  } catch (error) {
    console.log(error);
  }
};

exports.create = async (req, res) => {
  try {
    const house = await House.create(req.body);
    const newHouse = await House.findOne({
      where: { id: house.id },
      include: [
        {
          model: City,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
      attributes: { exclude: ["createdAt", "updatedAt", "CityId", "cityId"] },
    });
    res.send({ data: newHouse });
  } catch (error) {
    console.log(error);
  }
};

exports.update = async (req, res) => {
  try {
    await House.update(req.body, { where: { id: req.params.id } });
    const newHouse = await House.findOne({
      include: [
        {
          model: City,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
      where: { id: req.params.id },
      attributes: { exclude: ["createdAt", "updatedAt", "CityId", "cityId"] },
    });
    res.send({ data: newHouse });
  } catch (error) {
    console.log(error);
  }
};

exports.destroy = async (req, res) => {
  try {
    const delHouse = await House.destroy({ where: { id: req.params.id } });
    res.send({ data: delHouse });
  } catch (error) {
    console.log(error);
  }
};
