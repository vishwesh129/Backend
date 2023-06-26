const express = require("express");
const fs = require("fs");

const app = express();

// middleware to parse
app.use(express.json())
app.use(express.text());

// app.get("/", (req, res) => {
//   res.send("welcome to homepage");
// });
// app.get("/web", (req, res) => {
//   res.send("<h1>Vishwesh Goud Nakkala</h1>");
// });
// app.get("/products", (req, res) => {
//   res.send(JSON.stringify([1, 2, 3, 4, 5]));
// });

app.get("/", (req,res)=>{
  res.send("Hello from my first express server");
})

// app.get("/welcome", (req,res)=>{
//   console.log(req.query);
//   let name = req.query.name;
//   res.send(`welcome ${name}`);
// })

app.get("/welcome", (req,res)=>{
  console.log(req.query);
  let {name,age} = req.query;
  res.send(`Welcome ${name}, ${age > 18 ? 'You are eligible' : `Oops! Sorry ${name} you are not eligible`}`)
})

app.get('/users/:id', (req,res)=>{
  console.log(req.params);
  let userID = req.params.id;
  res.send(`Welcome ${userID}`);
})

app.post("/senddata", (req, res) => {
  // console.log(req.body);
  res.send("Okay I got your data");
});

// without stream, the whole data will be sent

app.get('/posts' , (req,res)=>{
  fs.readFile('./posts.json' , "utf-8" , (err, data)=>{
    if (err) {
      res.send("Something went wrong with the path");
    }
    else{
      res.send(data);
    }
  })
})

// with streaming, the same whole data will be sent in chunks
app.get('/newposts' , (req,res)=>{
  const postStream = fs.createReadStream('./posts.json' , "utf-8" );
  postStream.pipe(res);
})

app.get('/details' , (req,res)=>{
  // 1. read the file and get the data 
  fs.readFile('./db.json' , "utf-8" , (err,data)=>{
    let parsedData = JSON.parse(data);
    res.send(parsedData.users);
  })
})

app.post('/details', (req,res)=>{
  // 1. get the data
  const new_user = req.body;
  console.log(new_user);

  //2. add to the db.json in users
        // a) read the file and parse it.
      fs.readFile('./db.json', 'utf-8', (err,exist_data)=>{
        let parsedExistData = JSON.parse(exist_data);
        // b) then we will manipulate it => add new object to the users array in the object
        parsedExistData.users.push(new_user);
        // c) stringify it to make json
        let newData = JSON.stringify(parsedExistData);
        // d) write it back to the db.json
        fs.writeFile('./db.json', newData, "utf-8" , (err)=>{
          res.send("data added successfully");
        })
      });
})

app.listen(8080, () => {
  console.log("Server started on localhost:8080");
});
