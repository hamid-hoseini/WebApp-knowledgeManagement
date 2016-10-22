/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('answer', { 
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    intquestion_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    answer_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    answer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    iscorrect: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0'
    }
  });
};
