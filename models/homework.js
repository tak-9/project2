module.exports = function (sequelize, DataTypes) {
  var Homework = sequelize.define("Homework", {

    name: {
      type: DataTypes.STRING,
      allowNull: false
    }

  });

  Homework.associate = function (models) {
    Homework.hasOne(models.Grades, {
      foreignKey: {
        allowNull: true
      }
    });
  };
  return Homework;
};