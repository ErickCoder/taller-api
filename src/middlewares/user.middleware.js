const Users = require('../models/users.model');
const AppError = require('../utils/appError');

exports.validUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const users = await Users.findOne({
      where: { id },
      status: 'available',
    });

    if (!users) {
   /*    return res.status(404).json({
        status: 'error',
        message: `User with id: ${id} not found`,
      }); */
      return next(new AppError(`User with id: ${id} not foundddddddd`,404))
    }
    req.users = users;
    next();
   
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      status: 'error',
      message: 'Error validate user'
    })
  }
};
