// declare variables 

// this will import the express module
const express = require ("express");





// this app variable will route the HTTP requests, configure middleware, and rednereing HTML see more here: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction
const app = express ();




//  Environment variable
const PORT = process.env.PORT || 8080;

// this will returns middleware that only parses JSON and only looks at requests where the Content-Type header matches the type option. This parser accepts any Unicode encoding of the body and supports automatic inflation of gzip and deflate encodings. bp. urlencoded({ extended: true }) - middleware for parsing bodies from URL. https://stackoverflow.com/questions/55558402/what-is-the-mean-of-bodyparser-urlencoded-extended-true-and-bodyparser
app.use(express.urlencoded({extended: true}));

// serve static files ie notes.html & index.html in directory public 
// app.use(express.static('public'));

// recognize the incoming Request Object as a JSON Object
app.use(express.json());




app.get("*", (req,res) => {
    res.send("app is running");
});



//  initates the server with listen function
app.listen(PORT, () => {
    console.log("You have succesfully connected to server at " + PORT);
})