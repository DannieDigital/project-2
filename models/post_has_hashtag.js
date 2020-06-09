module.exports = function(sequelize, DataTypes) {
    var Post_has_hashtags = sequelize.define("Post_has_hashtags", {
      hashtag_id: DataTypes.INTEGER,
      post_id: DataTypes.INTEGER
    });
    return Post_has_hashtags;
  };
  