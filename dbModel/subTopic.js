/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('subTopic', { 
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    topic_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dependentTopic_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    }
  });
};
