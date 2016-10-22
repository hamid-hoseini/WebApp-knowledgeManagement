/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('topic', { 
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    subject_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  });
};
