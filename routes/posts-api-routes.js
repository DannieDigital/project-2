var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the posts
  app.get("/api/posts", function(req, res) {
    var query = {};
    if (req.query.users_id) {
      query.UsersId = req.query.users_id;
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
  app.get("/api/posts/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Author
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
  app.post("/api/posts", function(req, res) {
    db.Posts.create(req.body).then(function(dbPosts) {
      res.json(dbPosts);
      console.log(req.body)
    });
  });

  // DELETE route for deleting posts
  app.delete("/api/posts/:id", function(req, res) {
    db.Post.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // PUT route for updating posts
  app.put("/api/posts", function(req, res) {
    db.Post.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbPost) {
      res.json(dbPost);
    });
  });
};
