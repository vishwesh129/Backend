const express = require("express");
const cors = require("cors");

const { ordersRouter } = require("./Routes/orders.routes");
const { usersRouter } = require("./Routes/users.routes");

const app = express();
app.use(express.json());

app.use(cors());

// const mw1 = (req,res, next) => {
//      console.log("p")
//      next();
// }
// app.use(mw1);

// app.use((req, res, next)=>{
//     console.log("Hai from our 1st middleware")
//     console.log("p")               //pyc
//     next();
//     console.log("c");
// })

// const timeTracker = function (req, res, next) {
//     // Get the current time here in ms - startTime
//     const startTime = new Date().getTime();
//     console.log(startTime)
//     next();
//     // Get the current time here in ms - endTime
//     const endTime = new Date().getTime();
//     console.log(endTime)

//     console.log(endTime-startTime);
// }

// app.use(timeTracker);

// const electronics_count = 0
// const logger = (req, res, next)=>{
//     // console.log(req.method + " " + req.url)
//     if(req.url === '/electronics'){
//         electronics_count++;
//     }
//     next();
// }


// app.use(logger);

app.get("/", (req, res) => {
  // console.log("y")
  res.send("Welcome to Homepage");
});

app.use("/users", usersRouter);
app.use("/orders", ordersRouter);

app.get("/about", (req, res) => {
  // console.log("m")
  res.send("About page API");
});

app.listen(3000, () => {
  console.log("Listening on port localhost:3000");
});
