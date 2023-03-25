const formidable = require('formidable');
const fs = require('fs-extra');
const sequelize = require('sequelize');
const ApiError = require('../errors/api-error');
const models = require('../models/init-models');

class FileController
{
    async UploadFile(request, response)
    {
      console.log('\nЗагрузка файлов...');
        let form = new formidable.IncomingForm();
        form.parse(request, async (error, fields, values) => {
          for (let property_name of Object.keys(values))
          {
            try
            {
              if (values[property_name].filepath == undefined)
                continue;
              let filepath = values[property_name].filepath;
              let newpath = './files/' + values[property_name].originalFilename;
              fs.copyFile(filepath, newpath);
              let f = {
                path: newpath,
                status: 1,
                name: values[property_name].originalFilename
              }
              await models.files.create(f);
            }
            catch (e)
            {
              console.log(e.message);
              console.log('\nЗагрузка файла была прервана.');
              return;
            }
          }
          console.log('\nЗагрузка файлов успешно завершена.');
          response.write('Файлы успешно загружены!');
          response.end();
        });
        return response;
    }

    async GetFiles(request, response)
    {
      console.log('\nВыдан список файлов.');
      let files = await models.files.findAll();
      return response.json(files);
    }
}

module.exports = new FileController();