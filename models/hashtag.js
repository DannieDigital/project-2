module.exports = function(sequelize, DataTypes) {
    var Hashtag = sequelize.define("Hashtag", {
      tagname: DataTypes.STRING,
    });

    Hashtag.associate = function(models) {
      Hashtag.hasMany(models.Posts, {
        foreignKey: {
          allowNull: true
        }
      });
    };
    
    return Hashtag;
  };


  