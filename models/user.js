var bcrypt = require("bcryptjs");
module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define("User", {
    // Giving the Author model a name of type STRING
    userFirstName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    userLastName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    /*
    userName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    */
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    street: {
      type: DataTypes.STRING,
      allowNull: true
    },
    suburb: {
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

    phoneNumber: DataTypes.INTEGER,
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    yeargroup: DataTypes.INTEGER,
    userType: {
      type: DataTypes.STRING,
      allowNull: false
    }

  });

  User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  User.addHook("beforeCreate", function (user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });

  return User;
};