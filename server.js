
const express = require ("express");
const app = express ();

//  Environment variable
const PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

app.use(express.urlencoded({extended: true}));

app.use(express.json());

app.use(express.static('public'));


// Routes //

// require("./routes/html-routes.js")(app);



app.get("*", (req,res) => {
    res.send("app is running");
});



//  initates the server with listen function
app.listen(PORT, () => {
    console.log("You have succesfully connected to server at " + PORT);
})