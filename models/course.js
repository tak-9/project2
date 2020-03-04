module.exports = function(sequelize, DataTypes) {
    var Course = sequelize.define("Course", {

        courseName:  {
            type: DataTypes.STRING,
            allowNull: false
          },
    });
<<<<<<< HEAD

    Course.associate = function (models) {
        Course.hasMany(models.Grade, {
          foreignKey: {
            allowNull: false
          }
        });
      };
      Course.associate = function (models) {
        Course.hasMany(models.Homework, {
          foreignKey: {
            allowNull: false
          }
        });
      };
=======
    
    Course.associate = function (models) {
        Course.hasMany(models.Enrolment, {
          onDelete: "cascade"
        });
    };
>>>>>>> db10ba3f556de2769f6082c353cd332bb1cec85a

    return Course;
};