module.exports = function(sequelize, DataTypes) {
    var Posts = sequelize.define("Posts", {
      text: DataTypes.STRING,
      image: DataTypes.STRING,
    });

    Posts.associate = function(models) {
      Posts.belongsTo(models.Users, {
        foreignKey: {
          allowNull: false
        }
      });
    };
<<<<<<< HEAD
<<<<<<< HEAD

  

=======
    
>>>>>>> user routes working
=======

  

>>>>>>> hashtag associated with posts-hashtag api routes working
    return Posts;
  };