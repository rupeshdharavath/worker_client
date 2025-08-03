const mongoose = require('mongoose');

const application=mongoose.Schema({
    name:String,
    email:String,
    mobile_number:String,
    job_name:String,
    description:String,
    street:String,
    town:String,
    district:String,
    state:String,
    pincode:String,
    country:String,
});

module.exports=mongoose.model("Application",application);