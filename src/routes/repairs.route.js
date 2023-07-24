const express = require('express');
//controllers
const repairsController = require('./../controllers/repairs.controller');
const router = express.Router();

router
  .route('/')
  .post(repairsController.createRepair)
  .get(repairsController.showMotos);

router
  .route('/:id')
  .get(repairsController.FindRepairsPendingByID)
  .patch(repairsController.updateStatus)
  .delete(repairsController.changeStatus);

module.exports = router;
