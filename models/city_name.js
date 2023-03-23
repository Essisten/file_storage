const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('city_name', {
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
    tableName: 'city_name',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "city_name_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
