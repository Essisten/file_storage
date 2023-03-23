const Sequelize = require('sequelize');
const moment = require('moment-timezone');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('files', {
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    upload_time: {
      type: DataTypes.NOW,
      allowNull: false,
      defaultValue: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      references: {
        model: 'file_status',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'files',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "files_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
