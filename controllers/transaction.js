const { House, transaction, City } = require("../models");

exports.index = async (req, res) => {
  try {
    const order = await transaction.findAll({
      include: [
        {
          model: House,
          attributes: {
            exclude: ["createdAt", "updatedAt", "CityId", "cityId"],
          },
          include: [
            {
              model: City,
              attributes: { exclude: ["createdAt", "updatedAt"] },
            },
          ],
        },
      ],
      attributes: { exclude: ["createdAt", "updatedAt", "HouseId", "houseId"] },
    });
    res.send({ data: order });
  } catch (error) {
    console.log(error);
  }
};

exports.create = async (req, res) => {
  try {
    const order = await transaction.create(req.body);
    const newOrder = await transaction.findOne({
      where: { id: order.id },
      include: [
        {
          model: House,
          attributes: {
            exclude: ["createdAt", "updatedAt", "CityId", "cityId"],
          },
          include: [
            {
              model: City,
              attributes: { exclude: ["createdAt", "updatedAt"] },
            },
          ],
        },
      ],
      attributes: { exclude: ["createdAt", "updatedAt", "HouseId", "houseId"] },
    });
    res.send({ data: newOrder });
  } catch (error) {
    console.log(error);
  }
};

exports.update = async (req, res) => {
  try {
    await transaction.update(req.body, { where: { id: req.params.id } });
    const order = await transaction.findOne({
      include: [
        {
          model: House,
          attributes: {
            exclude: ["createdAt", "updatedAt", "CityId", "cityId"],
          },
          include: [
            {
              model: City,
              attributes: { exclude: ["createdAt", "updatedAt"] },
            },
          ],
        },
      ],
      where: { id: req.params.id },
      attributes: { exclude: ["createdAt", "updatedAt", "HouseId", "houseId"] },
    });
    res.send({ data: order });
  } catch (error) {
    console.log(error);
  }
};

exports.show = async (req, res) => {
  try {
    const order = await transaction.findOne({
      include: [
        {
          model: House,
          attributes: {
            exclude: ["createdAt", "updatedAt", "CityId", "cityId"],
          },
          include: [
            {
              model: City,
              attributes: { exclude: ["createdAt", "updatedAt"] },
            },
          ],
        },
      ],
      where: { id: req.params.id },
      attributes: { exclude: ["createdAt", "updatedAt", "HouseId", "houseId"] },
    });
    res.send({ data: order });
  } catch (error) {
    console.log(error);
  }
};
