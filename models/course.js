module.exports = function(sequelize, DataTypes) {
    var Course = sequelize.define("Course", {

        courseName:  {
            type: DataTypes.STRING,
            allowNull: false
          },
    });
    Course.associate = function (models) {
        Course.hasMany(models.Enrolment, {
          onDelete: "cascade"
        });
    };
    return Course;
};