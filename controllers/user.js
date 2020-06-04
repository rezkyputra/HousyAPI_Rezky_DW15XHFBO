const { User, List } = require("../models");

exports.index = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["createdAt", "updatedAt", "ListId", "listId"] },
    });
    res.send({ data: users });
  } catch (error) {
    console.log("error");
  }
};

exports.show = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: List,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
      attributes: { exclude: ["createdAt", "updatedAt", "ListId"] },
    });
    res.send({ data: user });
  } catch (error) {
    console.log(error);
  }
};
