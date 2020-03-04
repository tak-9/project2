module.exports = function(sequelize, DataTypes) {
    var Course = sequelize.define("Course", {

        courseName:  {
            type: DataTypes.STRING,
            allowNull: false
          },
    });

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

    return Course;
};