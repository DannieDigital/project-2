module.exports = function(sequelize, DataTypes) {
    var Following = sequelize.define("Following", {
      followed: DataTypes.STRING,
      followedBy: DataTypes.STRING
    });
    return Following;
  };