/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('back-questions', { 
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'Mock / Client / Phone / F2F'
    },
    company_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '1'
    },
    mode: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'text / audio / video'
    },
    topic_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    subject_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '2'
    },
    categories: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  });
};
