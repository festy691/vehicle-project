const express = require('express');
const userRouter  = require('./resources/user');
const imageRouter  = require('./resources/image');
const authRouter  = require('./resources/auth');
const vehicleRouter  = require('./resources/vehicle');
const locationRouter  = require('./resources/location');
const scheduleRouter  = require('./resources/schedule');

const restRouter = express.Router();

module.exports =  restRouter;

restRouter.use('/users', userRouter);
restRouter.use('/authenticate', authRouter);
restRouter.use('/images', imageRouter);
restRouter.use('/vehicles', vehicleRouter);
restRouter.use('/locations', locationRouter);
restRouter.use('/schedules', scheduleRouter);