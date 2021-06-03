const express = require('express');
const vehicleController = require('./vehicle.controller');
const upload = require('../../../config/multer');
const { protect, authorize } = require('../user/auth');

const vehicleRouter = express.Router();
module.exports = vehicleRouter;

vehicleRouter.route('/')
    .post(protect, authorize('admin'), upload.single('image'),vehicleController.createVehicle)
    .get(vehicleController.getAllVehicles);

vehicleRouter.route('/:id')
    .put(protect, authorize('admin'), upload.single('image'), vehicleController.updateVehicle)
    .get(vehicleController.getOneVehicle)
    .delete(protect, authorize('admin'), vehicleController.deleteVehicle);

vehicleRouter.route('/updatepics/:id').put(protect,vehicleController.updateVehicleImage);

vehicleRouter.route('/paginate/vehicles')
    .get(vehicleController.findAllPaginate);