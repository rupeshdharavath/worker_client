const express = require('express');
const Application = require('../models/Application');
const Router = express.Router();

Router.post('/insert', async (req, res) => {
  try {
    const data = req.body;

  
    const existing = await Application.findOne({ job_name: data.job_name });
    if (existing) {
      return res.status(409).json({ message: "Application with these details already exists" }); 
    }


    const new_app = await Application.create(data);
    if (!new_app) {
      return res.status(500).json({ message: "Failed to create application" }); 
    }

    return res.status(201).json({ message: "Application submitted successfully" }); 
  } catch (err) {
    return res.status(500).json({ message: err.message }); 
  }
});


Router.get('/get_jobs/:email',async(req,res)=>{
  try{
    const get_email=req.params.email;
    const jobs=await Application.find({email:get_email});
    if(!jobs || jobs.length===0)
    {
      return res.status(404).json({message:"no jobs applied",jobs:[]});
    }
    res.status(200).json({message:"jobs found",jobs});
  }
  catch(err){
    res.status(500).json({ message: err.message });
  }
})

Router.delete('/delete_job', async (req, res) => {
  try {
    const { email, job_name } = req.body;

    const existing = await Application.findOne({ email, job_name });
    if (!existing) {
      return res.status(404).json({ message: "No job application found" });
    }

    const deleted = await Application.findOneAndDelete({ email, job_name });

    if (deleted) {
      return res.status(200).json({ message: "Job deleted" });
    } else {
      return res.status(400).json({ message: "Failed to delete" });
    }

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

Router.get('/display_jobs',async(req,res)=>{
  try{
      const jobs=await Application.find();
      if(!jobs || jobs.length==0 ){
        return res.status(404).json({message:"no jobs found",jobs:[]});
      }
      res.status(200).json({message:"jobs extracted",jobs});
  }
  catch(err){
    res.status(500).json({message:err.message,jobs:[]});
  }
})


Router.get('/view_particular_job_details/:email/:job_name', async(req,res)=>{
  try{
    const email=req.params.email;
    const job_name=req.params.job_name;
    const jobs=await Application.findOne({email,job_name});
    if(!jobs){
      return res.status(404).json({message:"no job found",jobs:[]});
    }
    res.status(200).json({message:"found details",jobs});
  }
  catch(err){
    res.status(500).json({message:err.message});
  }
});

Router.get('/job/:search', async (req, res) => {
  try {
    const search = req.params.search;
    const job_list = await Application.find({
      $or: [
        { job_name: { $regex: `^${search}`, $options: 'i' } },
        { district: { $regex: `^${search}`, $options: 'i' } },
        { town: { $regex: `^${search}`, $options: 'i' } },
        { state: { $regex: `^${search}`, $options: 'i' } },
      ]
    });
    res.status(200).json({ message: "jobs found", job_list });
  } catch (err) {
    res.status(500).json({ message: err.message, job_list: [] });
  }
});


module.exports = Router;
