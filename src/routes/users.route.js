const express = require('express');
//controllers
const usersController = require('./../controllers/users.controller');
const loginController = require('./../controllers/login.controller');
//middlewares
const userMiddleware = require('./../middlewares/user.middleware');
const validatorMiddleware = require('./../middlewares/validations.middleware');
const authMiddleware = require('./../middlewares/auth.middleware');

const router = express.Router();

//Routes of users

router.post(
  '/login',
  validatorMiddleware.loginUserValidations,
  loginController.loginUser
);

router
  .route('/')
  .get(authMiddleware.protect, usersController.findAllUsers)
  .post(validatorMiddleware.userValidations, usersController.createUser);

router.use(authMiddleware.protect);
router
  .route('/:id')
  .get(userMiddleware.validUser, usersController.FindUserByID)
  .patch(userMiddleware.validUser, usersController.updateUsers)
  .delete(userMiddleware.validUser, usersController.deleteUsers);

module.exports = router;
