const url = require("url");
const path = require("path");
const cloudinary = require('../../../config/cloudinary');
const fs = require('fs');

const VehicleModel = require("./vehicle.model");

module.exports =  {
    async createVehicle(req,res){
        try {
            let Vehicle = new VehicleModel();

            let data = req.body;

            if (!data.vehicleModel) return res.status(400).send({"error":"vehicleModel is required"});
            if (!data.brand) return res.status(400).send({"error":"brand is required"});
            if (!data.capacity) return res.status(400).send({"error":"capacity is required"});
            if (!data.vehicleNumber) return res.status(400).send({"error":"vehicleNumber is required"});
            if (!data.description) return res.status(400).send({"error":"description is required"});

            Vehicle.vehicleModel = data.vehicleModel;
            Vehicle.capacity = data.capacity;
            Vehicle.description = data.description;
            Vehicle.description = data.description;
            Vehicle.vehicleNumber = data.vehicleNumber;
            Vehicle.brand = data.brand;

            await Vehicle.save((err, docs)=>{
                if (!err){
                    return res.status(200).send({"success":"Vehicle Registered"});
                }
                else{
                    return res.status(400).send({"error":err});
                }
            });
        } catch (err) {
            return res.status(400).send({"error":err});
        }
    },

    async updateVehicleImage(req,res){
        try {
            const Vehicle = await VehicleModel.findOne(({_id:req.params.id}));

            if(!Vehicle) return res.status(404).send({"error":'Vehicle not found'});

            let data = req.body;

            if(!data.image) return res.status(400).send({"error":'Image cannot be null'});

            Vehicle.image = data.image;

            await Vehicle.save(({_id:req.params.id}),(err, docs)=>{
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

    async updateVehicle(req,res){
        try {

            let data = req.body;
            console.log(data);

            const Vehicle = await VehicleModel.findOne({_id : req.params.id});

            if (!Vehicle) return res.status(404).send({"error":'Vehicle not found'});

            if(data.vehicleModel) Vehicle.vehicleModel = data.vehicleModel;
            if(data.capacity) Vehicle.capacity = data.capacity;
            if(data.description) Vehicle.description = data.description;
            if(data.vehicleNumber) Vehicle.vehicleNumber = data.vehicleNumber;
            if(data.brand) Vehicle.brand = data.brand;

            await Vehicle.save((err, doc)=>{
                if (!err){
                    return res.status(200).send({"success":`Vehicle updated`});
                }
                else{
                    return res.status(400).send({"error":err});
                }
            });

        } catch (err) {
            return res.status(400).send({"error":err});
        }
    },

    async getOneVehicle(req,res){
        try {
            VehicleModel.findOne(({_id : req.params.id}),(err, doc)=>{
                if(!err){
                    if (!doc)
                        return res.status(404).send({"error":"Vehicle not found"});
                    return res.status(200).send(doc);
                }
                else{
                    return res.status(400).send({"error":err});
                }
            });
        } catch (err) {
            return res.status(400).send({"error":err});
        }
    },

    async getAllVehicles(req,res){
        try {
            VehicleModel.find((err, docs)=>{
                if(!err){
                    return res.status(200).send(docs);
                }
                else{
                    return res.status(400).send({"error":err});
                }
            });
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
            await VehicleModel.paginate({},options,(err, docs)=>{
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

    async deleteVehicle(req,res){
        try {
            VehicleModel.findOne(({_id: req.params.id}),(err, doc)=>{
                if(!err){
                    if (!doc)
                        return res.status(404).send({"error":"Vehicle not found"});

                    doc.remove((err, docs)=>{
                        if (!err){
                            return res.status(200).send({"success":"Vehicle deleted"});
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
