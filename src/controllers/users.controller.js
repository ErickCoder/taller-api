const Users = require('../models/users.model');
const catchAsync = require('../utils/catchAsync');
const bcrypt = require('bcrypt');
const generateJWT = require('../utils/jwt');

exports.findAllUsers = catchAsync(async (req, res) => {
  /*  try { */
  const users = await Users.findAll({
    where: {
      status: 'available',
    },
  });
  res.status(200).json({
    status: 'success',
    message: 'List of users',
    results: users.length,
    users,
  });
  /*   } catch (error) {
    res.status(500).json({
      status: 'Fail',
      message: 'Error',
      error,
    });
  } */
});

exports.FindUserByID = catchAsync(async (req, res) => {
  /*   try { */

  const { users } = req;
  /*     const { id } = req.params;
    const user = await Users.findOne({
      where: {
        id,
        status: 'available',
      },
    }); */

  /*     if (!user) {
      return res.status(404).json({
        status: 'Error',
        message: `User with id: ${id} not found`,
      });
    } */

  res.status(200).json({
    message: `hello from the get route with id: ${users.id}`,
    users,
  });
  /*  } catch (error) {
    res.status(500).json({
      status: 'Fail',
      message: 'Something went wrong',
    }); */
  /* } */
});

exports.createUser = catchAsync(async (req, res) => {
  /*   try { */
  const { name, email, password, role } = req.body;

  const salt = await bcrypt.genSalt(12);
  const encryptedPassword = await bcrypt.hash(password, salt);
  const user = await Users.create({
    name,
    email,
    password: encryptedPassword,
    role,
  });
  const token = await generateJWT(user.id);

  res.status(201).json({
    status: 'success',
    message: 'User has been created',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
  /*   } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'Error',
      message: 'Something went very wrong',
    }); */
});

exports.updateUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role } = req.body;

    if (role) {
      res.status(400).json({
        status: 'Invalid',
        message: 'The role field cannot be edited',
      });
    }

    const user = await Users.findOne({
      where: {
        id,
        status: 'available',
      },
    });

    if (!user) {
      return res.status(404).json({
        satus: 'error',
        message: `User with id: ${id} not found`,
      });
    }
    await user.update({ name, email });
    res.status(200).json({
      status: 'success',
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'Fail',
      message: 'Error editing user',
    });
  }
};

exports.deleteUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.findOne({
      where: {
        id,
        status: 'available',
      },
    });

    if (!user) {
      return res.status(404).json({
        satus: 'error',
        message: `User with id: ${id} not found`,
      });
    }
    const userDelete = await user.update({
      status: 'disabled',
    });
    res.status(200).json({
      status: 'Suscces',
      message: 'User has been disabled',
      userDelete,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'Fail',
      message: 'ID invalid',
      error,
    });
  }
};
