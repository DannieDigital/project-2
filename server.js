var express = require("express");
//const upload = require ("express-fileupload")

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));

//Routes
//require("./routes/html-routes.js")(app);
require("./routes/users-api-routes.js")(app);
require("./routes/posts-api-routes.js")(app);


db.sequelize.sync({ force: true }).then(function() {
    app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });
  });



