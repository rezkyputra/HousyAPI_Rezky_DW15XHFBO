const { house, transaction, city, user, list } = require("../models");
const { Op } = require("sequelize");

exports.index = async (req, res) => {
  try {
    const order = await transaction.findAll({
      include: [
        {
          model: house,
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "cityId",
              "userId",
              "cityId",
              "userId",
            ],
          },
          include: [
            {
              model: city,
              attributes: { exclude: ["createdAt", "updatedAt"] },
            },
            {
              model: user,
              attributes: ["id", "username"],
            },
          ],
        },
        {
          model: user,
          attributes: ["id", "fullName", "phone", "gender"],
        },
      ],
      attributes: {
        exclude: [
          "createdAt",
          "updatedAt",
          "houseId",
          "houseId",
          "userId",
          "userId",
        ],
      },
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
          model: house,
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "cityId",
              "userId",
              "cityId",
              "userId",
            ],
          },
          include: [
            {
              model: city,
              attributes: ["id", "name"],
            },
            {
              model: user,
              attributes: ["id", "username"],
            },
          ],
        },
        {
          model: user,
          attributes: ["id", "username"],
        },
      ],
      attributes: {
        exclude: [
          "createdAt",
          "updatedAt",
          "houseId",
          "houseId",
          "userId",
          "userId",
        ],
      },
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
          model: house,
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "cityId",
              "userId",
              "cityId",
              "userId",
            ],
          },
          include: [
            {
              model: city,
              attributes: { exclude: ["createdAt", "updatedAt"] },
            },
            {
              model: user,
              attributes: ["id", "username"],
            },
          ],
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
          "houseId",
          "houseId",
          "userId",
          "userId",
        ],
      },
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
          model: house,
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "cityId",
              "cityId",
              "userId",
              "userId",
            ],
          },
          include: [
            {
              model: city,
              attributes: { exclude: ["createdAt", "updatedAt"] },
            },
            {
              model: user,
              attributes: ["id", "username"],
            },
          ],
        },
        {
          model: user,
          attributes: ["id", "fullName", "phone", "gender"],
        },
      ],
      where: { id: req.params.id },
      attributes: {
        exclude: [
          "createdAt",
          "updatedAt",
          "houseId",
          "houseId",
          "userId",
          "userId",
        ],
      },
    });
    res.send({ data: order });
  } catch (error) {
    console.log(error);
  }
};

//show all tenant
exports.showalltenant = async (req, res) => {
  try {
    const order = await transaction.findAll({
      include: [
        {
          model: house,
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "cityId",
              "cityId",
              "userId",
              "userId",
            ],
          },
          include: [
            {
              model: city,
              attributes: { exclude: ["createdAt", "updatedAt"] },
            },
            {
              model: user,
              attributes: ["id", "username"],
            },
          ],
        },
        {
          model: user,
          attributes: {
            exclude: ["createdAt", "updatedAt", "listId", "listId"],
          },
          include: [
            {
              model: list,
              attributes: ["id", "name"],
            },
          ],
        },
      ],
      where: { userId: req.params.id },
      attributes: {
        exclude: ["updatedAt", "houseId", "houseId", "userId", "userId"],
      },
    });
    res.send({ data: order });
  } catch (error) {
    console.log(error);
  }
};

//show all owner
exports.showallowner = async (req, res) => {
  try {
    const order = await transaction.findAll({
      include: [
        {
          model: house,
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "cityId",
              "cityId",
              "userId",
              "userId",
            ],
          },
          include: [
            {
              model: city,
              attributes: { exclude: ["createdAt", "updatedAt"] },
            },
            {
              model: user,
              attributes: ["id", "fullName", "phone", "gender"],
            },
          ],
        },
        {
          model: user,
          attributes: {
            exclude: ["createdAt", "updatedAt", "listId", "listId"],
          },
        },
      ],
      where: { fromId: req.params.id },
      attributes: {
        exclude: ["updatedAt", "houseId", "houseId", "userId", "userId"],
      },
    });
    res.send({ data: order });
  } catch (error) {
    console.log(error);
  }
};
