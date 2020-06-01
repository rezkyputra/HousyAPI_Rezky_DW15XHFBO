const express = require("express");
const router = express.Router();
const { index: findUsers, show: findUser } = require("../controllers/user");
const {
  index: findHouses,
  show: findHouse,
  create: addHouse,
  update: updateHouse,
  destroy: deleteHouse,
} = require("../controllers/house");
const {
  index: findOrders,
  show: findOrder,
  showall: findAllOrder,
  create: addOrder,
  update: updateOrder,
} = require("../controllers/transaction");
const { login, register } = require("../controllers/auth");

// Middlewares
const { authenticated } = require("../middlewares/auth");

// Auth routes
router.post("/signin", login);
router.post("/signup", register);

//House Houses
router.get("/houses", findHouses);
router.get("/house/:id", findHouse);
router.post("/house", authenticated, addHouse);
router.patch("/house/:id", authenticated, updateHouse);
router.delete("/house/:id", authenticated, deleteHouse);

//order
router.get("/orders", findOrders);
router.get("/order/:id", findOrder);
router.get("/orders/:id", findAllOrder);
router.post("/order", authenticated, addOrder);
router.patch("/order/:id", authenticated, updateOrder);

// User
router.get("/users", authenticated, findUsers);
router.get("/user/:id", authenticated, findUser);

module.exports = router;
