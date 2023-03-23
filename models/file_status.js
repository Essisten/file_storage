const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('file_status', {
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
    tableName: 'file_status',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "file_status_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
