const express = require("express");
const userCtrl = require("../controllers/user.controller");

const router = express.Router();

router
  .route("/api/users")
  .post(userCtrl.create)
  .get(userCtrl.listOfUsers)
  .delete(userCtrl.removeUser)
  .put(userCtrl.updateUser);

router.route("/api/users?userId").get(userCtrl.userByID);

module.exports = router;
