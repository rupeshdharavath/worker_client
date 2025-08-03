const express=require('express');
const Router=express.Router();
const Slot = require('../models/Slot');

Router.post('/insert', async (req,res)=>{
    try{
        const {worker,worker_name,client,job_name,date,time}=req.body;
        console.log(req.body);
        const existing=await Slot.findOne({worker,job_name,date,time});
        if(existing){
            return res.status(404).json({message:"slot already booked"});
        }
        const new_slot=await Slot.create({worker,worker_name,client,job_name,date,time});
        if(!new_slot){
            return res.status(404).json({message:"failed to create"});
        }
        res.status(200).json({message:"slot has been booked"});
    }
    catch(err){
        res.status(500).json({message:"slot already booked"});
    }
})

Router.post('/get_booked_slots', async (req, res) => {
    try {
        const { worker, date } = req.body;

        if (!worker || !date) {
            return res.status(400).json({ message: "Worker and date are required" });
        }

        const booked = await Slot.find({ worker, date });

        res.status(200).json({ booked });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


Router.post('/get_profile_details',async(req,res)=>{
    try{
        const {client}=req.body;
        const applied_slot=await Slot.find({client});
        if(applied_slot.length===0){
            return res.status(404).json({message:"no slots booked",applied_slot:[]});
        }
        res.status(200).json({message:"showimg slots booked",applied_slot});
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
})

Router.delete('/delete', async(req,res)=>{
    try{
        const {_id}=req.body;
        console.log(req.body);
        const fiindDelete=await Slot.findOneAndDelete({_id});
        if(fiindDelete){
            return res.status(200).json({message:"slot deleted"});
        }
        res.status(404).jsonp({message:"internal problem"});
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
})

module.exports=Router;