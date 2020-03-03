module.exports = function (sequelize, DataTypes) {
  var Parent = sequelize.define("Parent", {
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        isEmail: true
      }
    }
  });

  Parent.associate = function (models) {
    Parent.hasMany(models.User, {
      onDelete: "cascade"
    });
  };

  return Parent;
};
