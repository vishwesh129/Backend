const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    age: {type : Number , required : true},
    country: {type : String , required : true},
})
const Usermodel = mongoose.model("users", userSchema)

const main = async () => {
    try {
        const connection = await mongoose.connect("mongodb://127.0.0.1:27017/mngoclass")
        console.log("Connected to database")
        // connection.disconnect()
        // console.log("Disconnected from database")

        // await Usermodel.insertMany([{ name: "John", age: 55, country: "United States" },
        // { name: "Cena", age: 45, country: "United Kingdom" }]);
        // console.log("Data inserted successfully")
        
        // const users = await Usermodel.find()
        // console.log(users); 

        // await Usermodel.insertMany([{ name: "Wick", course: "full stack", batch: 10}]);
        // console.log("Data inserted successfully")

        await Usermodel.insertMany([{ name: "Vishu", age: "25", country: "United States"}]);
        console.log("Data inserted successfully")

    }
    catch (err) {
        console.log("Error connecting to DB");
        console.log(err);
    }
}

main();