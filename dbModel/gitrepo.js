/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('gitrepo', { 
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    topic_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    }
  });
};
