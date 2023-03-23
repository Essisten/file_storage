const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('constructive_element_group', {
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'constructive_element_group',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "constructive_element_group_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
