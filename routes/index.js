const express = require("express");
const router = express.Router();
const {
  index: findUsers,
  show: findUser,
  showUser: findTheUser,
  create: createUser,
  update: updateUser,
  destroy: deleteUser,
} = require("../controllers/user");
const { login, register } = require("../controllers/auth");

// Middlewares
const { authenticated } = require("../middlewares/auth");

// Auth routes
router.post("/login", login);
router.post("/register", register);

// User
router.get("/users", findUsers);
router.get("/user", findTheUser);
router.get("/user/:id", findUser);
router.post("/users", createUser);
router.patch("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

module.exports = router;
