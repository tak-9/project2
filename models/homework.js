module.exports = function (sequelize, DataTypes) {
  var Homework = sequelize.define("Homework", {

    name: {
      type: DataTypes.STRING,
      allowNull: false
    }

  });

  Homework.associate = function (models) {
    Homework.belongsTo(models.Grades, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Homework;
};