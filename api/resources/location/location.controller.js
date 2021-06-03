const url = require("url");
const path = require("path");
const cloudinary = require('../../../config/cloudinary');
const fs = require('fs');

const LocationModel = require("./location.model");

module.exports =  {
    async createLocation(req,res){
        try {
            let Location = new LocationModel();

            let data = req.body;
            let city = data.city;

            let thisLocation = await LocationModel.findOne({city:city});

            if (thisLocation) return res.status(400).send({"error":"city already exist"});

            if (!data.city) return res.status(400).send({"error":"city is required"});

            Location.city = data.city;

            await Location.save((err, docs)=>{
                if (!err){
                    return res.status(200).send({"success":"Location Added"});
                }
                else{
                    return res.status(400).send({"error":err});
                }
            });
        } catch (err) {
            return res.status(400).send({"error":err});
        }
    },

    async updateLocationImage(req,res){
        try {
            const Location = await LocationModel.findOne(({_id:req.params.id}));

            if(!Location) return res.status(404).send({"error":'Location not found'});

            let data = req.body;

            if(!data.image) return res.status(400).send({"error":'Image cannot be null'});

            Location.image = data.image;

            await Location.save(({_id:req.params.id}),(err, docs)=>{
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

    async updateLocation(req,res){
        try {

            let data = req.body;
            console.log(data);

            const Location = await LocationModel.findOne({_id : req.params.id});

            if (!Location) return res.status(404).send({"error":'Location not found'});

            if(data.city) Location.city = data.city;

            await Location.save((err, doc)=>{
                if (!err){
                    return res.status(200).send({"success":`Location updated`});
                }
                else{
                    return res.status(400).send({"error":err});
                }
            });

        } catch (err) {
            return res.status(400).send({"error":err});
        }
    },

    async getOneLocation(req,res){
        try {
            LocationModel.findOne(({_id : req.params.id}),(err, doc)=>{
                if(!err){
                    if (!doc)
                        return res.status(404).send({"error":"Location not found"});
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

    async getAllLocations(req,res){
        try {
            LocationModel.find((err, docs)=>{
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
            await LocationModel.paginate({},options,(err, docs)=>{
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

    async deleteLocation(req,res){
        try {
            LocationModel.findOne(({_id: req.params.id}),(err, doc)=>{
                if(!err){
                    if (!doc)
                        return res.status(404).send({"error":"Location not found"});

                    doc.remove((err, docs)=>{
                        if (!err){
                            return res.status(200).send({"success":"Location deleted"});
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
