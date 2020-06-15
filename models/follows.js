module.exports = function(sequelize, DataTypes) {
    var Follows = sequelize.define("Follows", {
      id: { type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
      },
      followerId: { 
          type: DataTypes.INTEGER,
          allowNull: false

      },
      followingId: {
          type: DataTypes,
          allowNull: false
      }
    });
  
    Follows.associate = function(models) {
      Follows.belongsTo(models.Users, {
        as: "following",
        foreignKey: "followingId" 
      });

      Follows.belongsTo(models.Users, {
        as: "follower",
        foreignKey: "followerId" 
      });

     
}
  
    return Follows;
  };