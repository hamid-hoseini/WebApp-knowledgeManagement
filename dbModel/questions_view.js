/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('questions_view', { 
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    company_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '1'
    },
    categories: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    topic_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    mode: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'text / video / audio'
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'Phone / F2F / Client / Mock'
    },
    subject_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '2'
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  });
};
