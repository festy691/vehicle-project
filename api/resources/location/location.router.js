const express = require('express');
const locationController = require('./location.controller');
const upload = require('../../../config/multer');
const { protect, authorize } = require('../user/auth');

const locationRouter = express.Router();
module.exports = locationRouter;

locationRouter.route('/')
    .post(protect, authorize('admin'), upload.single('image'),locationController.createLocation)
    .get(locationController.getAllLocations);

locationRouter.route('/:id')
    .put(protect, authorize('admin'), upload.single('image'), locationController.updateLocation)
    .get(locationController.getOneLocation)
    .delete(protect, authorize('admin'), locationController.deleteLocation);

locationRouter.route('/updatepics/:id').put(protect,locationController.updateLocationImage);

locationRouter.route('/paginate/locations')
    .get(locationController.findAllPaginate);