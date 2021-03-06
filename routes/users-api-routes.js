var db = require("../models");

module.exports = function(app) {
  //this route works  
  app.get("/api/users", function(req, res) {
     //gets all users plus all their posts
      db.Users.findAll({
        include: [db.Posts]
      }).then(function(dbUsers) {
        res.json(dbUsers);
      });
    });
  
    
    app.get("/api/users/:id", function(req, res) {
      //gets user by id and includes all their posts
      db.Users.findOne({
        where: {
          id: req.params.id
        },
        include: [db.Posts]
      }).then(function(dbUsers) {
        res.json(dbUsers);
      });
    });

    app.get("/api/followers", function(req, res) {
        //this route works
      //gets all users as "followingId" plus all their followers
      db.Follows.findAll({
        include: ["follower"]
      }).then(function(dbFollows) {
        res.json(dbFollows);
      });
    });

    /*app.get("/api/users/followers/:id", function(req, res) {
      //gets user by id and includes all their followers
      db.Users.findOne({
        where: {
          id: req.params.id
        },
        include: [db.Followers]
      }).then(function(dbUsers) {
        res.json(dbUsers);
      });
    });*/
  
    //this route works
    app.post("/api/users", function(req, res) {
      db.Users.create(req.body).then(function(dbUsers) {
        res.json(dbUsers);
      });
      
    });

    //this route works
    app.post("/api/followers", function(req, res) {
        db.Follows.create(req.body).then(function(dbFollows) {
          res.json(dbFollows);
        });
        
      });
    
  
  };