const express = require("express");
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const app = express();
const client_id = "de442ab3ea2a250bc7dd";
const client_secret = "2e85101651d9af3c33e572a39bcbc9ff22280374"

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Welcome")
})

app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

app.get("/auth/github", async(req, res) => {
    const { code } = req.query;
    const response = await fetch("https://github.com/login/oauth/access_token", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ client_id, client_secret, code })
    })
    .then((res)=>res.json())
    // console.log(response)
    const access_token = response.access_token;

    const user_info = await fetch("https://api.github.com/user" , {
        headers :{
            Authorization: `Bearer ${access_token}` 
        }
    }).then((res) =>res.json())
    console.log(user_info);
    res.send("Post authentication Page");
})


app.listen(8000, () => {
    console.log("listening on localhost:8000");
})