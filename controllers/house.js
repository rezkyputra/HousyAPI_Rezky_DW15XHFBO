const { house, city, user, list } = require("../models");
const { Op } = require("sequelize");

exports.index = async (req, res) => {
  try {
    if (req.query.typeRent && req.query.belowPrice) {
      const houses = await house.findAll({
        include: [
          {
            model: city,
            attributes: ["id", "name"],
          },
          {
            model: user,
            attributes: ["id", "fullname"],
            include: [
              {
                model: list,
                attributes: ["id", "name"],
              },
            ],
          },
        ],
        where: {
          [Op.and]: [
            { typeRent: { [Op.eq]: req.query.typeRent } },
            { price: { [Op.lt]: req.query.belowPrice } },
          ],
        },
        attributes: {
          exclude: [
            "createdAt",
            "updatedAt",
            "userId",
            "cityId",
            "userId",
            "cityId",
          ],
        },
      });
      res.send({ data: houses });
    } else if (req.query.typeRent || req.query.belowPrice) {
      const houses = await house.findAll({
        include: [
          {
            model: city,
            attributes: ["id", "name"],
          },
          {
            model: user,
            attributes: ["id", "username"],
            include: [
              {
                model: list,
                attributes: ["id", "name"],
              },
            ],
          },
        ],
        where: {
          [Op.or]: [
            { typeRent: { [Op.eq]: req.query.typeRent } },
            { price: { [Op.lt]: req.query.belowPrice } },
          ],
        },
        attributes: {
          exclude: [
            "createdAt",
            "updatedAt",
            "userId",
            "cityId",
            "userId",
            "cityId",
          ],
        },
      });

      res.send({ data: houses });
    } else {
      const houses = await house.findAll({
        include: [
          {
            model: city,
            attributes: ["id", "name"],
          },
          {
            model: user,
            attributes: ["id", "username"],
            include: [
              {
                model: list,
                attributes: ["id", "name"],
              },
            ],
          },
        ],
        attributes: {
          exclude: [
            "createdAt",
            "updatedAt",
            "userId",
            "cityId",
            "userId",
            "cityId",
          ],
        },
      });

      res.send({ data: houses });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.show = async (req, res) => {
  try {
    const House = await house.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: city,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
        {
          model: user,
          attributes: ["id", "fullname"],
          include: [
            {
              model: list,
              attributes: ["id", "name"],
            },
          ],
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "userId", "cityId"],
      },
    });
    res.send({ data: House });
  } catch (error) {
    console.log(error);
  }
};

exports.create = async (req, res) => {
  try {
    const House = await house.create(req.body);
    const newHouse = await house.findOne({
      where: { id: House.id },
      include: [
        {
          model: city,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
        {
          model: user,
          attributes: ["id", "fullname"],
          include: [
            {
              model: list,
              attributes: ["id", "name"],
            },
          ],
        },
      ],
      attributes: {
        exclude: [
          "createdAt",
          "updatedAt",
          "userId",
          "cityId",
          "userId",
          "cityId",
        ],
      },
    });
    res.send({ data: newHouse });
  } catch (error) {
    console.log(error);
  }
};

exports.update = async (req, res) => {
  try {
    await house.update(req.body, { where: { id: req.params.id } });
    const newhouse = await house.findOne({
      include: [
        {
          model: city,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
        {
          model: user,
          attributes: ["id", "username"],
          include: [
            {
              model: list,
              attributes: ["id", "name"],
            },
          ],
        },
      ],
      where: { id: req.params.id },
      attributes: {
        exclude: [
          "createdAt",
          "updatedAt",
          "userId",
          "cityId",
          "userId",
          "cityId",
        ],
      },
    });
    res.send({ data: newhouse });
  } catch (error) {
    console.log(error);
  }
};

exports.destroy = async (req, res) => {
  try {
    const delhouse = await house.destroy({ where: { id: req.params.id } });
    res.send({ data: delhouse });
  } catch (error) {
    console.log(error);
  }
};
