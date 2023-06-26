const express = require("express");
const passport = require("./google.oauth")
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Welcome")
})

app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' , session : false }),
    function (req, res) {
        // Successful authentication, redirect home.
        console.log(req.user)
        res.redirect('/');
    });


app.listen(7000, () => {
    console.log("listening on localhost:7000");
})