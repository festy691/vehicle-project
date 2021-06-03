const mongoose = require('mongoose');
const mongosePaginate = require('mongoose-paginate');

let LocationSchema = new mongoose.Schema({
    city : {
        type : String,
        required : true,
        unique : true
    },
    date : {
        type : Date,
        default : Date.now()
    },
});

LocationSchema.plugin(mongosePaginate);
module.exports = mongoose.model("Location", LocationSchema);