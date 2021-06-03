const url = require("url");
const path = require("path");
const cloudinary = require('../../../config/cloudinary');
const fs = require('fs');

const ScheduleModel = require("./Schedule.model");

module.exports =  {
    async createSchedule(req,res){
        try {
            let Schedule = new ScheduleModel();

            let data = req.body;

            if (!data.departureDate) return res.status(400).send({"error":"departureDate is required"});
            if (!data.location) return res.status(400).send({"error":"location is required"});
            if (!data.vehicle) return res.status(400).send({"error":"capacity is required"});
            if (!data.departureTime) return res.status(400).send({"error":"ScheduleNumber is required"});

            Schedule.departureDate = data.departureDate;
            Schedule.location = data.location;
            Schedule.vehicle = data.vehicle;
            Schedule.departureTime = data.departureTime;

            await Schedule.save((err, docs)=>{
                if (!err){
                    return res.status(200).send({"success":"Schedule Placed"});
                }
                else{
                    return res.status(400).send({"error":err});
                }
            });
        } catch (err) {
            return res.status(400).send({"error":err});
        }
    },

    async updateScheduleImage(req,res){
        try {
            const Schedule = await ScheduleModel.findOne(({_id:req.params.id}));

            if(!Schedule) return res.status(404).send({"error":'Schedule not found'});

            let data = req.body;

            if(!data.image) return res.status(400).send({"error":'Image cannot be null'});

            Schedule.image = data.image;

            await Schedule.save(({_id:req.params.id}),(err, docs)=>{
                if (!err){
                    return res.status(200).send({"success":"Image updated"});
                }
                else{
                    return res.status(400).send({"error":err});
                }
            });
        } catch (err) {
            return res.status(400).send({"error":err});
        }
    },

    async updateSchedule(req,res){
        try {

            let data = req.body;
            console.log(data);

            const Schedule = await ScheduleModel.findOne({_id : req.params.id});

            if (!Schedule) return res.status(404).send({"error":'Schedule not found'});

            if(data.departureDate) Schedule.departureDate = data.departureDate;
            if(data.location) Schedule.location = data.location;
            if(data.vehicle) Schedule.vehicle = data.vehicle;
            if(data.departureTime) Schedule.departureTime = data.departureTime;

            await Schedule.save((err, doc)=>{
                if (!err){
                    return res.status(200).send({"success":`Schedule updated`});
                }
                else{
                    return res.status(400).send({"error":err});
                }
            });

        } catch (err) {
            return res.status(400).send({"error":err});
        }
    },

    async getOneSchedule(req,res){
        try {
            ScheduleModel.findOne(({_id : req.params.id}),(err, doc)=>{
                if(!err){
                    if (!doc)
                        return res.status(404).send({"error":"Schedule not found"});
                    return res.status(200).send(doc);
                }
                else{
                    return res.status(400).send({"error":err});
                }
            }).populate('location', 'city').populate('vehicle', '_id vehicleModel brand capacity vehicleNumber description');
        } catch (err) {
            return res.status(400).send({"error":err});
        }
    },

    async getAllSchedules(req,res){
        try {
            ScheduleModel.find((err, docs)=>{
                if(!err){
                    return res.status(200).send(docs);
                }
                else{
                    return res.status(400).send({"error":err});
                }
            }).populate('location', 'city').populate('vehicle', '_id vehicleModel brand capacity vehicleNumber description');
        } catch (err) {
            return res.status(400).send({"error":err});
        }
    },

    async findAllTodaySchedule(req,res){
        try {
            // var date = req.body.date;
            // date.setHours(0,0,0,0);
            // date = date.toISOString()
            await ScheduleModel.find({user:req.query.user, departureDate:req.query.date},(err, docs)=>{
                if(!err){
                    if (docs) return res.status(200).send(docs);
                }
                else{
                    return res.status(400).send({"error":err});
                }
            }).populate('location', 'city').populate('vehicle', '_id vehicleModel brand capacity vehicleNumber description');
        } catch (err) {
            return res.status(400).send({"error":err});
        }
    },

    async findAllPaginate(req,res){
        try {
            const {page,perPage} = req.query;
            const options = {
                page: parseInt(page,10) || 1,
                limit: parseInt(perPage,10) || 10,
                sort: {date: -1}
            }
            await ScheduleModel.paginate({},options,(err, docs)=>{
                if(!err){
                    if (docs) return res.status(200).send(docs);
                }
                else{
                    return res.status(400).send({"error":err});
                }
            });
        } catch (err) {
            return res.status(400).send({"error":err});
        }
    },

    async deleteSchedule(req,res){
        try {
            ScheduleModel.findOne(({_id: req.params.id}),(err, doc)=>{
                if(!err){
                    if (!doc)
                        return res.status(404).send({"error":"Schedule not found"});

                    doc.remove((err, docs)=>{
                        if (!err){
                            return res.status(200).send({"success":"Schedule deleted"});
                        }
                        else{
                            return res.status(400).send({"error":err});
                        }
                    });
                }
                else{
                    return res.status(400).send({"error":err});
                }
            });
        } catch (err) {
            return res.status(400).send({"error":err});
        }
    }
}
