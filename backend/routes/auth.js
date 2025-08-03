const express=require('express');
const Router=express.Router();
const user=require('../models/User');

Router.post('/signup',async (req,res)=>{
    try{
        const {name,email,password,role}=req.body;
        const existing=await user.findOne({email});
        if(existing){
            return res.status(300).json({message:"user already exist with this email"});
        }
        const new_user=await user.create({name,email,password,role});
        if(!new_user){
            return res.status(400).json({message:"failed to create"});
        }
        res.status(200).json({message:"account created"});
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
})


Router.post('/login',async(req,res)=>{
    try{
        const {email,password,role}=req.body;
        const existing=await user.findOne({email,password,role});
        if(!existing){
            return res.status(400).json({message:"no account found,sign up first"});
        }
        res.status(200).json({message:"login succesfull",name:existing.name,email,role});
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
})


module.exports=Router;