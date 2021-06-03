const express = require('express');
const scheduleController = require('./schedule.controller');
const upload = require('../../../config/multer');
const { protect, authorize } = require('../user/auth');

const scheduleRouter = express.Router();
module.exports = scheduleRouter;

scheduleRouter.route('/')
    .post(protect, authorize('admin'), upload.single('image'),scheduleController.createSchedule)
    .get(scheduleController.getAllSchedules);

scheduleRouter.route('/:id')
    .put(protect, authorize('admin'), upload.single('image'), scheduleController.updateSchedule)
    .get(scheduleController.getOneSchedule)
    .delete(protect, authorize('admin'), scheduleController.deleteSchedule);

scheduleRouter.route('/updatepics/:id').put(protect,scheduleController.updateScheduleImage);

scheduleRouter.route('/date/mine')
    .get(protect, scheduleController.findAllTodaySchedule);

scheduleRouter.route('/paginate/schedules')
    .get(scheduleController.findAllPaginate);