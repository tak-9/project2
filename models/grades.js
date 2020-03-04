module.exports = function (sequelize, DataTypes) {
  var Grades = sequelize.define("Grades", {
    
    grade: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    
    /*
    courseId: {
      type: DataTypes.INTEGER,
      allowNull: false,

    },
    homeworkId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
    */
  });

  /*
  Grades.associate = function (models) {
    Grades.belongsTo(models.Course, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  */

  Grades.associate = function (models) {
    Grades.hasOne(models.Homework, {
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