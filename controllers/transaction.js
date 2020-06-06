const { House, Transaction, City, User, List } = require("../models");
const { Op } = require("sequelize");

exports.index = async (req, res) => {
  try {
    const order = await Transaction.findAll({
      include: [
        {
          model: House,
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "CityId",
              "UserId",
              "cityId",
              "userId",
            ],
          },
          include: [
            {
              model: City,
              attributes: { exclude: ["createdAt", "updatedAt"] },
            },
            {
              model: User,
              attributes: ["id", "username"],
            },
          ],
        },
        {
          model: User,
          attributes: ["id", "fullName", "phone", "gender"],
        },
      ],
      attributes: {
        exclude: [
          "createdAt",
          "updatedAt",
          "HouseId",
          "houseId",
          "UserId",
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
    const order = await Transaction.create(req.body);
    const newOrder = await Transaction.findOne({
      where: { id: order.id },
      include: [
        {
          model: House,
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "CityId",
              "UserId",
              "cityId",
              "userId",
            ],
          },
          include: [
            {
              model: City,
              attributes: ["id", "name"],
            },
            {
              model: User,
              attributes: ["id", "username"],
            },
          ],
        },
        {
          model: User,
          attributes: ["id", "username"],
        },
      ],
      attributes: {
        exclude: [
          "createdAt",
          "updatedAt",
          "HouseId",
          "houseId",
          "UserId",
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
    await Transaction.update(req.body, { where: { id: req.params.id } });
    const order = await Transaction.findOne({
      include: [
        {
          model: House,
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "CityId",
              "UserId",
              "cityId",
              "userId",
            ],
          },
          include: [
            {
              model: City,
              attributes: { exclude: ["createdAt", "updatedAt"] },
            },
            {
              model: User,
              attributes: ["id", "username"],
            },
          ],
        },
        {
          model: User,
          attributes: ["id", "username"],
          include: [
            {
              model: List,
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
          "HouseId",
          "houseId",
          "UserId",
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
    const order = await Transaction.findOne({
      include: [
        {
          model: House,
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "CityId",
              "cityId",
              "UserId",
              "userId",
            ],
          },
          include: [
            {
              model: City,
              attributes: { exclude: ["createdAt", "updatedAt"] },
            },
            {
              model: User,
              attributes: ["id", "username"],
            },
          ],
        },
        {
          model: User,
          attributes: ["id", "fullName", "phone", "gender"],
        },
      ],
      where: { id: req.params.id },
      attributes: {
        exclude: [
          "createdAt",
          "updatedAt",
          "HouseId",
          "houseId",
          "UserId",
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
    const order = await Transaction.findAll({
      include: [
        {
          model: House,
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "CityId",
              "cityId",
              "UserId",
              "userId",
            ],
          },
          include: [
            {
              model: City,
              attributes: { exclude: ["createdAt", "updatedAt"] },
            },
            {
              model: User,
              attributes: ["id", "username"],
            },
          ],
        },
        {
          model: User,
          attributes: {
            exclude: ["createdAt", "updatedAt", "ListId", "listId"],
          },
          include: [
            {
              model: List,
              attributes: ["id", "name"],
            },
          ],
        },
      ],
      where: { userId: req.params.id },
      attributes: {
        exclude: ["updatedAt", "HouseId", "houseId", "UserId", "userId"],
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
    const order = await Transaction.findAll({
      include: [
        {
          model: House,
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "CityId",
              "cityId",
              "UserId",
              "userId",
            ],
          },
          include: [
            {
              model: City,
              attributes: { exclude: ["createdAt", "updatedAt"] },
            },
            {
              model: User,
              attributes: ["id", "fullName", "phone", "gender"],
            },
          ],
        },
        {
          model: User,
          attributes: {
            exclude: ["createdAt", "updatedAt", "ListId", "listId"],
          },
        },
      ],
      where: { fromId: req.params.id },
      attributes: {
        exclude: ["updatedAt", "HouseId", "houseId", "UserId", "userId"],
      },
    });
    res.send({ data: order });
  } catch (error) {
    console.log(error);
  }
};
