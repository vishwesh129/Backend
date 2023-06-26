const express = require('express');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require("dotenv").config()

const { connection } = require('./db');
const { Usermodel } = require('./User.model');

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome");
})

app.post("/signup", async (req, res) => {
    const { email, password, name, age } = req.body
    const hashed_password = bcrypt.hashSync(password, 8);                 // saltRounds = 8
    // Store hash in your password DB.
    const new_user = new Usermodel({
        email,
        password : hashed_password,
        name,
        age
    })

    await new_user.save();
    res.send("Signup Successfull")
})

app.post("/login", async (req, res) => {
    const { email, password } = req.body
    const user = await Usermodel.findOne({ email});
    console.log(user);
    
    if(!user){
        res.send("Please signup")
    }
    const hash = user.password;
    // Load hash from your password DB.
    const correct_password = bcrypt.compareSync(password, hash); // true
                          // bcrypt.compareSync(someOtherPlaintextPassword, hash); // false

    if (correct_password) {
        const token = jwt.sign({ userID : user._id }, process.env.JWT_SECRET);
        res.send({ "msg": "Login Successfull", "token": token });
    }
    else {
        res.send("Login Failed")
    }
})

app.get("/reports", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        res.send("Please Login again")
    }
    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
        if(decoded) {
            res.send("Here are the reports");
        }
        else{
            res.send("Please Login again...")
        }    
    });
})

app.get("/about" , (req, res)=>{
    res.send("About Details")
})


app.listen(8080, async () => {
    try {
        await connection;
        console.log("Connected to DB successfully")
    }
    catch (err) {
        console.log(err);
        console.log("Error while connecting to DB")
    }
    console.log("listening on localhost:8080");
})