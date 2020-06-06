const jwt = require("jsonwebtoken");
const { user } = require("../models");

exports.authenticated = async (req, res, next) => {
  try {
    let token = req.header("Authorization");
    if (token) {
      token = token.replace("Bearer ", "");
      const data = jwt.verify(token, "this-is-my-secret-key");
      if (data) {
        const User = await user.findOne({ where: { id: data.id } });
        if (!User) {
          res.status(403).send({ message: "Forbidden request!" });
        } else {
          req.User = User.id;
          req.token = token;
          next();
        }
      } else {
        res.status(403).send({ message: "Forbidden request!" });
      }
    } else {
      res.status(401).send({ message: "You're unauthorized!" });
    }
  } catch (error) {
    res.status(500).send({ message: "Server Internal Error" });
    console.log(error);
  }
};
