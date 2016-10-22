/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('curriculum_view', { 
    subject_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    subject_desc: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    topic_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    topic_desc: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    subTopic_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    subTopic_desc: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  });
};
