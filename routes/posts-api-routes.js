var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the posts
  // This route works
  app.get("/api/posts", function(req, res) {
    var query = {};
    if (req.query.users_id) {
      query.UserId = req.query.users_id;
    }
    // Includes user
    db.Posts.findAll({
      where: query,
      include: [db.Users]
    }).then(function(dbPosts) {
      res.json(dbPosts);
    });
  });

  // Get route for retrieving a single post
  // This route works
  app.get("/api/posts/:id", function(req, res) {
    
    db.Posts.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Users]
    }).then(function(dbPosts) {
      res.json(dbPosts);
    });
  });

  // POST route for saving a new post
  // This route works (UserId)
  app.post("/api/posts", function(req, res) {
    db.Posts.create(req.body).then(function(dbPosts) {
      res.json(dbPosts);
      console.log(req.body)
    });
  });

  // DELETE route for deleting posts
  // this route works but does not return deleted post
  app.delete("/api/posts/:id", function(req, res) {
    db.Posts.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbPosts) {
      res.json(dbPosts);
    });
  });

  // PUT route for updating posts
  // this route works but does not return updated post
  app.put("/api/posts", function(req, res) {
    db.Posts.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbPosts) {
      res.json(dbPosts);
    });
  });
};
