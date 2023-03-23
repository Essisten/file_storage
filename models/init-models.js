var DataTypes = require("sequelize").DataTypes;
var _building_number = require("./building_number");
var _city_name = require("./city_name");
var _city_type = require("./city_type");
var _constructive_element_group = require("./constructive_element_group");
var _data = require("./data");
var _file_status = require("./file_status");
var _files = require("./files");
var _founded_address = require("./founded_address");
var _municipal_knowledge = require("./municipal_knowledge");
var _street_name = require("./street_name");
var _street_type = require("./street_type");
const sequelize = require('../db');

function initModels() {
  var building_number = _building_number(sequelize, DataTypes);
  var city_name = _city_name(sequelize, DataTypes);
  var city_type = _city_type(sequelize, DataTypes);
  var constructive_element_group = _constructive_element_group(sequelize, DataTypes);
  var data = _data(sequelize, DataTypes);
  var file_status = _file_status(sequelize, DataTypes);
  var files = _files(sequelize, DataTypes);
  var founded_address = _founded_address(sequelize, DataTypes);
  var municipal_knowledge = _municipal_knowledge(sequelize, DataTypes);
  var street_name = _street_name(sequelize, DataTypes);
  var street_type = _street_type(sequelize, DataTypes);

  data.belongsTo(building_number, { as: "building_number_building_number", foreignKey: "building_number"});
  building_number.hasMany(data, { as: "data", foreignKey: "building_number"});
  data.belongsTo(city_name, { as: "city_name_city_name", foreignKey: "city_name"});
  city_name.hasMany(data, { as: "data", foreignKey: "city_name"});
  data.belongsTo(city_type, { as: "city_type_city_type", foreignKey: "city_type"});
  city_type.hasMany(data, { as: "data", foreignKey: "city_type"});
  data.belongsTo(constructive_element_group, { as: "constructive_element_group_constructive_element_group", foreignKey: "constructive_element_group"});
  constructive_element_group.hasMany(data, { as: "data", foreignKey: "constructive_element_group"});
  files.belongsTo(file_status, { as: "status_file_status", foreignKey: "status"});
  file_status.hasMany(files, { as: "files", foreignKey: "status"});
  data.belongsTo(founded_address, { as: "founded_address_founded_address", foreignKey: "founded_address"});
  founded_address.hasMany(data, { as: "data", foreignKey: "founded_address"});
  data.belongsTo(municipal_knowledge, { as: "municipal_knowledge_municipal_knowledge", foreignKey: "municipal_knowledge"});
  municipal_knowledge.hasMany(data, { as: "data", foreignKey: "municipal_knowledge"});
  data.belongsTo(street_name, { as: "street_name_street_name", foreignKey: "street_name"});
  street_name.hasMany(data, { as: "data", foreignKey: "street_name"});
  data.belongsTo(street_type, { as: "street_type_street_type", foreignKey: "street_type"});
  street_type.hasMany(data, { as: "data", foreignKey: "street_type"});

  return {
    building_number,
    city_name,
    city_type,
    constructive_element_group,
    data,
    file_status,
    files,
    founded_address,
    municipal_knowledge,
    street_name,
    street_type,
  };
}
module.exports = initModels();
//module.exports.initModels = initModels;
//module.exports.default = initModels;
