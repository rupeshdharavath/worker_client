const mongoose=require('mongoose');

const SlotSchema=mongoose.Schema({
    worker:String,
    worker_name:String,
    client:String,
    job_name:String,
    date:Date,
    time:String
})

module.exports=mongoose.model("Slot",SlotSchema);