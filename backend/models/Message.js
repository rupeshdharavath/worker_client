const mongoose=require('mongoose');

const messageSchema=mongoose.Schema({
    sender:String,
    receiver:String,
    sender_role:String,
    receiver_role:String,
    sender_name:String,
    receiver_name:String,
    job_name:String,
    msg_sent:String
},{timestamps:true});

module.exports=mongoose.model("MessageSchema",messageSchema);