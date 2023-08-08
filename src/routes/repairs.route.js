const express = require('express');
//controllers
const repairsController = require('./../controllers/repairs.controller');

//middleware
const repairsMiddleware = require('./../middlewares/repairs.middleware');
const validateMiddleware = require('./../middlewares/validations.middleware')

const router = express.Router();

router
  .route('/')
  .post(validateMiddleware.repairValidations,repairsController.createRepair)
  .get(repairsController.showMotos);

router
  .route('/:id')
  .get(repairsMiddleware.validRepairs, repairsController.FindRepairsPendingByID)
  .patch(repairsMiddleware.validRepairs, repairsController.updateStatus)
  .delete(repairsMiddleware.validRepairs, repairsController.changeStatus);

module.exports = router;
