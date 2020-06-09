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
    return Posts;
  };
