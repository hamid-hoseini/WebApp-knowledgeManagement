/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('projects', { 
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gitrepo_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    subject_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    }
  });
};
