var db = require("../models");

module.exports = function(app) {
 
  app.get("/api/hashtags", function(req, res) {
     // this route works
     //gets all hashtags plus all their posts
      db.Hashtag.findAll({
        include: [db.Posts]
      }).then(function(dbHashtag) {
        res.json(dbHashtag);
      });
    });
  
    // this route works
    app.get("/api/hashtags/:id", function(req, res) {
      //gets hashtag by id and includes all their posts
      db.Hashtag.findOne({
        where: {
          id: req.params.id
        },
        include: [db.Posts]
      }).then(function(dbHashtag) {
        res.json(dbHashtag);
      });
    });
  
   // this route works
    app.post("/api/hashtags", function(req, res) {
      db.Hashtag.create({tagname: req.body.tagname}).then(function(dbHashtag) {
        res.json(dbHashtag);
        console.log(req.body)
      });
    });
    
  
  };