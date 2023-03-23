const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('municipal_knowledge', {
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
    tableName: 'municipal_knowledge',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "municipal_knowledge_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
