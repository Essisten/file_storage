const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('street_name', {
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
    tableName: 'street_name',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "street_name_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
