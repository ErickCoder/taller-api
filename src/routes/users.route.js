const express = require("express");
//controllers
const usersController = require("./../controllers/users.controller");
const router = express.Router();

//Routes of users
router
  .route("/")
  .get(usersController.findAllUsers)
  .post(usersController.createUser);

router
  .route("/:id")
  .get(usersController.FindUserByID)
  .patch(usersController.updateUsers)
  .delete(usersController.deleteUsers);

module.exports = router;
