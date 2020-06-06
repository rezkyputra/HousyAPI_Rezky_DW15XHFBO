const { user, list } = require("../models");

exports.index = async (req, res) => {
  try {
    const users = await user.findAll({
      include: [
        {
          model: list,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
      attributes: { exclude: ["createdAt", "updatedAt", "listId", "listId"] },
    });
    res.send({ data: users });
  } catch (error) {
    console.log("error");
  }
};

exports.show = async (req, res) => {
  try {
    const User = await user.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: list,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
      attributes: { exclude: ["createdAt", "updatedAt", "listId"] },
    });
    res.send({ data: User });
  } catch (error) {
    console.log(error);
  }
};
