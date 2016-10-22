/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('codeexercise', { 
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
      defaultValue: 'class example / lab work / topic test'
    },
    content: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    topic_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    categories: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  });
};
