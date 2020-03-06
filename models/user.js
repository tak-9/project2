var bcrypt = require("bcryptjs");
module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    school: {
      type: DataTypes.STRING,
      allowNull: true
    },
    bithdate: {
      type: DataTypes.STRING,
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    yeargroup: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    userType: {
      type: DataTypes.STRING,
      allowNull: false
    }

  });
  User.associate = function (models) {
    User.belongsTo(models.Parent, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  User.associate = function (models) {
    User.hasMany(models.Enrolment, {
      onDelete: "cascade"
    });
  };

  User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  User.addHook("beforeCreate", function (user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });

  return User;
};