const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('building_number', {
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
    tableName: 'building_number',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "building_number_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
