const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { user } = require("../models");

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const User = await user.findOne({
      where: {
        username,
      },
    });
    if (!User) {
      res.status(401).send({ message: "Invalid login" });
    } else {
      const list = User.listId;
      const id = User.id;
      bcrypt.compare(password, User.password, (err, result) => {
        if (result) {
          jwt.sign({ id: User.id }, "this-is-my-secret-key", (err, token) => {
            const data = {
              username,
              token,
              list,
              id,
            };
            res.status(200).send({ data });
          });
        } else {
          res.status(401).send({ message: "Invalid login" });
        }
      });
    }
  } catch (error) {
    res.status(500).send({ message: "Server Internal Error" });
    console.log(error);
  }
};

exports.register = async (req, res) => {
  try {
    const saltRounds = 10;
    const { username, password } = req.body;
    const User = await user.findOne({
      where: {
        username,
      },
    });
    if (!User) {
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        const value = {
          ...req.body,
          password: hash,
        };
        const newUser = await user.create(value);
        jwt.sign({ id: newUser.id }, "this-is-my-secret-key", (err, token) => {
          const id = newUser.id;
          const list = newUser.listId;
          const data = {
            username,
            token,
            list,
            id,
          };
          res.status(200).send({ data });
        });
      });
    } else {
      res.status(400).send({ message: "Username already registered" });
    }
  } catch (error) {
    res.status(500).send({ message: "Server Internal Error" });
    console.log(error);
  }
};
