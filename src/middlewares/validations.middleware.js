const { body, validationResult } = require('express-validator');

const valideFields = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.mapped(),
    });
  }
  next();
};

exports.userValidations = [
  body('name').notEmpty().withMessage('name is required'),
  body('email').notEmpty().withMessage('email is required').isEmail().withMessage('Insert a valid email'),
  body('password').isLength({min:6}).withMessage('password needs to be at least 6 characters'),
  valideFields
];

exports.repairValidations = [
  body('date').notEmpty().withMessage('date is required'),
  body('motorsNumbers').notEmpty().withMessage('motorsNumber is required'),
  body('description').isLength({min:10}).withMessage('description needs to be at least 10 characters'),
  valideFields
];


