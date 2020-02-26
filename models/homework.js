module.exports = function(sequelize, DataTypes) {
    var Homework = sequelize.define("Homework", {

        name:  {
            type: DataTypes.STRING,
            allowNull: false
          },
          couseId: {
            type: DataTypes.INTEGER,
            allowNull: false
          }

    });

    Homework.associate = function(models) {
        Homework.belongsTo(models.Course, {
          foreignKey: {
            allowNull: false
          }
        });
      };
    return Homework;
};