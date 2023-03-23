const sequelize = require('sequelize');
const ApiError = require('../errors/api-error');
const models = require('../models/init-models');

class StreetController
{
    async GetStreets(request, response)
    {
      let streets = await models.street_name.findAll();
      return response.json(streets);
    }
}

module.exports = new StreetController();