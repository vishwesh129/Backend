const express = require("express");
const {connection} = require("./db")
const {Usermodel} = require("./User.model")

const app = express();

app.use(express.json());

app.get("/" , (req, res)=>{
    res.send("Basic end point");
})

app.get("/users", async(req,res)=>{
    const users = await Usermodel.find({deleted : false})
    res.status(200).send({users})
})

app.post("/users/create" , async(req, res)=>{

    const {name, age, city} = req.body;
    const user = new Usermodel({
        name,
        age,
        city
    })
    await user.save();
    res.send("User was created successfully")
})

app.put("/users/:userId" , async(req, res)=>{
    const {userId} = req.params
    const payload = req.body;
    await Usermodel.findByIdAndUpdate({_id : userId} , payload)
    res.send("User was updated successfully")
})

app.delete("/users/:userId" , async(req, res)=>{
    const {userId} = req.params
    const payload = {deleted : true}
    await Usermodel.findByIdAndUpdate({_id : userId}, payload)
    res.send(`User ${userId} was deleted successfully`)
})

app.listen(8000, async ()=>{
    try{
        await connection;
        console.log("Connected to DB successfully")
    }
    catch(err){
        console.log("error while connecting to DB")
        console.log(err);
    }
    console.log("listening on localhost:8000");
})