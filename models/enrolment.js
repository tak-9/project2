module.exports = function (sequelize, DataTypes) {
  var Enrolment = sequelize.define("Enrolment", {
    
    CourseId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

/*
  Enrolment.associate = function (models) {
    Enrolment.hasMany(models.Course, {
      onDelete: "cascade"
    });
  };
  Enrolment.associate = function (models) {
    Enrolment.hasMany(models.User, {
      onDelete: "cascade"
    });
  };
*/
  return Enrolment;
}