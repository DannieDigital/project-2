module.exports = function(sequelize, DataTypes) {
    var Users = sequelize.define("Users", {
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      avatar: DataTypes.STRING
    });

    Users.associate = function(models) {
      Users.hasMany(models.Posts, {
        onDelete: "cascade"
      })
    }
    return Users;
  };