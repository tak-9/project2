module.exports = function (sequelize, DataTypes) {
  var Grades = sequelize.define("Grades", {
    
    grade: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  });

  Grades.associate = function (models) {
    Grades.belongsTo(models.Homework, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  Grades.associate = function (models) {
    Grades.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Grades;
};