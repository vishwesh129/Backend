const express = require('express');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require("dotenv").config()

const { connection } = require('./db');
const { Usermodel } = require('./User.model');

const app = express();

app.use(express.json());

const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]
    if (!token) {
        return res.send("please login")
    }
    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
        const { userID } = decoded
        req.userID = userID
        if (decoded) {
            // res.send("Here are the reports");
            next()
        }
        else {
            res.send("Please login")
        }
    });
}

const authorise = (permittedRoleArray)=>{
    return async (req, res, next) => {
        const user = await Usermodel.findOne({_id : req.userID})
        const userrole = user.role;
        // if(req.url === "/products/create" && userrole === "seller"){
        //     next();
        // }
        // else if(req.url === "/upcomingsalesdays" && userrole === "seller"){
        //     next();
        // }
        // else if(req.url === "/yourbirthdaycoupon" && userrole === "customer"){
        //     next();
        // }
        // else{
        //     res.send("Your are not authorized..")
        // }
        if(permittedRoleArray.includes(userrole)){
            next()
        }
        else{
            res.send("you are not authorised")
        }
    }
}
    
app.get("/", (req, res) => {
    res.send("Welcome");
})

app.post("/signup", async (req, res) => {
    const { email, password, name, age, role } = req.body
    const hashed_password = bcrypt.hashSync(password, 8);                 // saltRounds = 8
    // Store hash in your password DB.
    const new_user = new Usermodel({
        email,
        password: hashed_password,
        name,
        age,
        role
    })

    await new_user.save();
    res.send("Signup Successfull")
})

app.post("/login", async (req, res) => {
    const { email, password } = req.body
    const user = await Usermodel.findOne({ email });
    console.log(user);

    if (!user) {
        res.send("Please signup")
    }
    const hash = user.password;
    // Load hash from your password DB.
    const correct_password = bcrypt.compareSync(password, hash); // true
    // bcrypt.compareSync(someOtherPlaintextPassword, hash); // false

    if (correct_password) {
        const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET);
        res.send({ "msg": "Login Successfull", "token": token });
    }
    else {
        res.send("Login Failed")
    }
})

// Protected endpoint
app.get("/reports", authenticate, (req, res) => {
    res.send("Here are the reports");

})

// protected route
app.get("/finance", authenticate, (req, res) => {
    res.send("finance Details")
})

// unprotected route
app.get("/about", (req, res) => {
    res.send("About Details")
})

//everyone who is authenticated, should have access to
app.get("/products", authenticate, (req, res) => {
    res.send("products")
})

// seller
app.get("/products/create", authenticate, authorise(["seller"]), (req, res) => {
    res.send("product created")
})

// seller, marketer
app.get("/upcomingsaledays", authenticate, authorise(["seller", "marketer"]), (req, res)=>{
    res.send("These are the upcoming sale days")
   
})

//customer
app.get("/yourbirthdaycoupon", authenticate, authorise(["customer"]), (req, res) => {
    res.send("here is your birthday coupon")
})

//admin
app.get("/products/delete", authenticate, authorise(["admin"]), (req, res) => {
    res.send("product deleted")
})

//admin
app.get("/makeadmin", authenticate, authorise(["admin"]), async (req, res) => {
    const {email} = req.body
    await Usermodel.findOneAndUpdate({email : email}, {role : "admin"})
    res.send("role updated")
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