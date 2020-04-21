const { User, List } = require("../models");

exports.index = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: List,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
      attributes: { exclude: ["createdAt", "updatedAt", "ListId", "listId"] },
    });
    res.send({ data: users });
  } catch (error) {
    console.log("error");
  }
};

exports.destroy = async (req, res) => {
  try {
    const users = await User.destroy({ where: { id: req.params.id } });
    res.send({ data: users });
  } catch (error) {
    console.log(error);
  }
};
