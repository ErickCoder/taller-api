const express = require('express');
//controllers
const repairsController = require('./../controllers/repairs.controller');

//middleware
const repairsMiddleware = require('./../middlewares/repairs.middleware');
const validateMiddleware = require('./../middlewares/validations.middleware');
const authMiddleware = require('./../middlewares/auth.middleware');

const router = express.Router();

router.use(authMiddleware.protect);

router
  .route('/').get(authMiddleware.restrictTo('employee'), repairsController.showMotos)
  .post(validateMiddleware.repairValidations, repairsController.createRepair)
  

router.use(authMiddleware.restrictTo('employee'));

router
  .route('/:id')
  .get(repairsMiddleware.validRepairs, repairsController.FindRepairsPendingByID)
  .patch(repairsMiddleware.validRepairs, repairsController.updateStatus)
  .delete(repairsMiddleware.validRepairs, repairsController.changeStatus);

module.exports = router;
