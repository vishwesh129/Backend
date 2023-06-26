const express = require("express");

const ordersRouter = express.Router();

ordersRouter.get('/' , (req,res)=>{
    res.send("All Orders");
})
ordersRouter.get("/history" , (req,res)=>{
    res.send("Order History")
})
ordersRouter.get("/refund" , (req,res)=>{
    res.send("Refunded Order");
})

module.exports = {ordersRouter};