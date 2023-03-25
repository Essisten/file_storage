const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('data', {
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    municipal_area: {
      type: DataTypes.STRING,
      allowNull: true
    },
    municipal_knowledge: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'municipal_knowledge',
        key: 'id'
      }
    },
    city_type: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'city_type',
        key: 'id'
      }
    },
    city_name: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'city_name',
        key: 'id'
      }
    },
    street_type: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'street_type',
        key: 'id'
      }
    },
    street_name: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'street_name',
        key: 'id'
      }
    },
    founded_address: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'founded_address',
        key: 'id'
      }
    },
    building_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'building_number',
        key: 'id'
      }
    },
    constructive_element_group: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'constructive_element_group',
        key: 'id'
      }
    },
    capital_repair_year: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    repair_cost_preview: {
      type: DataTypes.DECIMAL,
      get() {
        const value = this.getDataValue('repair_cost_preview');
        return value === null ? null : parseFloat(value);
      },
      allowNull: true,
      defaultValue: 0
    },
    repair_end_year: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    federal_budget: {
      type: DataTypes.DECIMAL,
      get() {
        const value = this.getDataValue('federal_budget');
        return value === null ? null : parseFloat(value);
      },
      allowNull: true,
      defaultValue: 0
    },
    regional_budget: {
      type: DataTypes.DECIMAL,
      get() {
        const value = this.getDataValue('regional_budget');
        return value === null ? null : parseFloat(value);
      },
      allowNull: true,
      defaultValue: 0
    },
    local_budget: {
      type: DataTypes.DECIMAL,
      get() {
        const value = this.getDataValue('local_budget');
        return value === null ? null : parseFloat(value);
      },
      allowNull: true,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'data',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "data_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
