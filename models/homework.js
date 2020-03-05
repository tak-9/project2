module.exports = function (sequelize, DataTypes) {
  var Homework = sequelize.define("Homework", {

    name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    CourseId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

  });
  

  Homework.associate = function (models) {
    Homework.belongsTo(models.Grades, {
      foreignKey: {
        allowNull: true
      }
    });
  };

  Homework.associate = function (models) {
    Homework.hasMany(models.Grades, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Homework;
};