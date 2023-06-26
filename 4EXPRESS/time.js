const express = require('express');

const app = express();

// Print the time taken between the request and the response when an API endpoint was hit.
const timeTracker = function (req, res, next) {
    // Get the current time here in ms - startTime
    const startTime = new Date().getTime();
    console.log(startTime)
    next();
    // Get the current time here in ms - endTime
    const endTime = new Date().getTime();
    console.log(endTime-startTime);
}

app.use(timeTracker);

app.get('/' , (req,res)=>{
    res.send("Welcome")
})

app.listen(3030 , ()=>{
    console.log("Listening on port localhost:3030");
})