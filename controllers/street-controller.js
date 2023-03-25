const sequelize = require('sequelize');
const ApiError = require('../errors/api-error');
const models = require('../models/init-models');

class StreetController
{
    async GetStreets(request, response)
    {
      console.log('\nВыдан список улиц.');
      let streets = await models.street_name.findAll();
      return response.json(streets);
    }

    async GetStats(request, response, next)
    {
      console.log('\nСбор статистики...');
      let street_name = request.query.street;
      if (street_name == undefined)
        return next(ApiError.BadRequest('Улица не указана.'));
      let street_name_id = await models.street_name.findOne({where: {name: street_name}});
      if (street_name_id == null)
        return next(ApiError.BadRequest('Улица не найдена.'));
      street_name_id = street_name_id.dataValues.id;
      let entries = await models.data.findAll({where: {street_name: street_name_id}});
      let stat = {
        repair_cost: [],
        work_count: [],
        federal_sum: 0,
        regional_sum: 0,
        local_sum: 0,
      };
      for (let e of entries)
      {
        let cost = {}, entry = e, rep_year = `${entry.capital_repair_year}`;
        cost[rep_year] = entry.repair_cost_preview;
        stat.repair_cost.push({...cost});
        let count = {}, value = await models.data.count(
          {
            where: {capital_repair_year: entry.capital_repair_year}
          });
        count[rep_year] = value;
        stat.work_count.push(count);

        stat.federal_sum += entry.federal_budget;
        stat.regional_sum += entry.regional_budget;
        stat.local_sum += entry.local_budget;
      }
      stat.repair_cost.sort((a, b) => Number(Object.keys(a)[0]) - Number(Object.keys(b)[0]));
      stat.work_count.sort((a, b) => Number(Object.keys(a)[0]) - Number(Object.keys(b)[0]));
      console.log('\nСбор статистики завершён');
      return response.json(stat);
    }
}

module.exports = new StreetController();