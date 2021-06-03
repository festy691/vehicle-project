const mongoose = require('mongoose');
const mongosePaginate = require('mongoose-paginate');

let VehicleSchema = new mongoose.Schema({
    vehicleModel : {
        type : String,
        required : true
    },
    brand : {
        type : String,
        required : true
    },
    capacity : {
        type : Number,
        required : true
    },
    vehicleNumber : {
        type : Number,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        default : Date.now()
    },
});

VehicleSchema.plugin(mongosePaginate);
module.exports = mongoose.model("Vehicle", VehicleSchema);