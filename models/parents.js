module.exports = function(sequelize, DataTypes) {
    var Parent = sequelize.define("Author", {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      phone: DataTypes.INTEGER,
      email:{
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        validate: {
          isEmail: true
        }
    },
    studentid: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
    });


  
    Parent.associate = function(models) {
      Parent.hasMany(models.User, {
        onDelete: "cascade"
      });
    };
    return Parent;
  };
  