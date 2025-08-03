const express = require('express');
const Router = express.Router();
const Message = require('../models/Message');

Router.post('/insert',async (req,res)=>{
  try{
    console.log(req.body);
    const { sender,receiver,sender_role,receiver_role,sender_name,receiver_name,job_name,msg_sent}=req.body;
    console.log(job_name);
    const created=await Message.create({sender,receiver,sender_role,receiver_role,sender_name,receiver_name,job_name,msg_sent});
    if(!created){
      return res.status(404).json({message:"message not created"});
    }
    res.status(200).json({message:"message created"});
  }
  catch(err){
    res.status(500).json({message:err.message});
  }
})


Router.post('/get_messages', async (req, res) => {
  try {
    const { sender, receiver, job_name } = req.body;

    const all_msgs = await Message.find({
      job_name,
      $or: [
        { sender, receiver },
        { sender: receiver, receiver: sender }
      ]
    }).sort({ createdAt: 1 }); 

    res.status(200).json({ message: "Messages retrieved", all_msgs });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


Router.post('/get_notification',async(req,res)=>{
  try{
      const {receiver,receiver_name,receiver_role}=req.body;
      const get_all_notifications=await Message.find({receiver,receiver_name,receiver_role});
      if(get_all_notifications.length===0){
        return res.status(404).json({message:"no messages found",get_all_notifications:[]})
      }
      res.status(200).json({message:"notificatio available",get_all_notifications});
  }
  catch(err){
    res.status(500).json({message:err.message});
  }
})
module.exports = Router;
