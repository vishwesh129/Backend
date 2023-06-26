const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  // res.write("hello");
  // res.write(" world");
  // if(req.url === "/"){
  //     return res.end("Welcome to Homepage");
  // }
  // if(req.url === '/products'){
  //     res.setHeader("Content-Type", "application/json");
  //     return res.end(JSON.stringify([1,2,3,4,5]))
  // }
  // if(req.url === '/web'){
  //     return res.end("<h1>Hyderabad</h1>");
  // }
  // res.end("hello masai!");

  // console.log(req.url)
  // console.log(req.method + " " + req.url)
  // res.end("hello");

  // if(req.method === "GET" && req.url === '/salt'){
  //     res.end("Here is your Salt")
  // }
  // else if (req.method === "GET" && req.url === '/sugar'){
  //     res.end("Here is your Sugar");
  // }
  // else if (req.method === "GET" && req.url === '/reports'){
  //     res.end("Here is your Reports");
  // }
  // else{
  //     res.end("hello");
  // }

  if (req.method === "GET" && req.url === "/posts") {
    // res.end("Here is your Posts");
    fs.readFile("./posts.json", "utf-8", (err, data) => {
      if (err) {
        res.end("Something went wrong");
      } else {
        res.setHeader("Content-type", "application/json");
        res.end(data);
      }
    });
  } 
  else if(req.url === '/secretdata'){
    res.statusCode = 404;
    res.end("You are not allowed to access this");
  }
  else {
    res.end("hello");
  }
});

server.listen(8080, () => {
  console.log("server started on localhost:8080/");
});
