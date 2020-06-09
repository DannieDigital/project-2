module.exports = function(sequelize, DataTypes) {
    var Posts = sequelize.define("Posts", {
      author_id: DataTypes.INTEGER,
      text: DataTypes.STRING,
      image: DataTypes.STRING,
      timestamp: DataTypes.TIME
    });
    return Posts;
  };