module.exports = function(sequelize, DataTypes) {
    var Hashtags = sequelize.define("Hashtags", {
      name: DataTypes.STRING
    });
    return Hashtags;
  };