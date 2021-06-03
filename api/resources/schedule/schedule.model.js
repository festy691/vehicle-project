const mongoose = require('mongoose');
const mongosePaginate = require('mongoose-paginate');

let ScheduleSchema = new mongoose.Schema({
    departureDate : {
        type : Date,
        required : true
    },
    location : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Location',
        required : true
    },
    vehicle : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Vehicle',
        required : true
    },
    departureTime : {
        type : Number,
        required : true
    },
    date : {
        type : Date,
        default : Date.now()
    },
});

ScheduleSchema.plugin(mongosePaginate);
module.exports = mongoose.model("Schedule", ScheduleSchema);