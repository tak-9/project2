module.exports = function (sequelize, DataTypes) {
  var Enrolment = sequelize.define("Enrolmet", {

    couseId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    studentId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

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
  return Enrolment;
}