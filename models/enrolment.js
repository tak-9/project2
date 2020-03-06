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
  return Enrolment;
}



