module.exports = function(sequelize, DataTypes) {
    var Users = sequelize.define("Users", {
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      avatar: DataTypes.STRING
    });
    return Users;
  };