const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('founded_address', {
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
    tableName: 'founded_address',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "founded_address_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
