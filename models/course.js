module.exports = function(sequelize, DataTypes) {
    var Course = sequelize.define("Course", {

        courseName:  {
            type: DataTypes.STRING,
            allowNull: false
          },
    });
    return Course;
};