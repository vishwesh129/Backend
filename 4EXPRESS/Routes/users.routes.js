const express = require('express');

const usersRouter = express.Router();

usersRouter.get('/' , (req,res)=>{
    res.send("All Users");
})
usersRouter.get('/active' , (req,res)=>{
    res.send("Active Users");
})
usersRouter.get('/subscribe' , (req,res)=>{
    res.send("Subscribed Users");
})
usersRouter.get('/inactive' , (req,res)=>{
    res.send("Inactive Users");
})

module.exports = {usersRouter};