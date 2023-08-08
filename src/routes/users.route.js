const express = require('express');
//controllers
const usersController = require('./../controllers/users.controller');

//middlewares
const userMiddleware= require ('./../middlewares/user.middleware')
const validatorMiddleware = require('./../middlewares/validations.middleware')
const router = express.Router();

//Routes of users
router
  .route('/')
  .get(usersController.findAllUsers)
  .post(validatorMiddleware.userValidations, usersController.createUser);

router
  .route('/:id')
  .get( userMiddleware.validUser, usersController.FindUserByID)
  .patch(userMiddleware.validUser, usersController.updateUsers)
  .delete(userMiddleware.validUser, usersController.deleteUsers);

module.exports = router;
