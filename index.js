require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const models = require('./models/init-models');
const cors = require('cors');
const router = require('./routes/index');
const error_handler = require('./errors/middleware');
const Excel = require('exceljs');
const app = express();

var file_process_lock = false;

app.use(cors());
app.use(express.json());
app.use('/api', router)
app.use(error_handler);

const start = async () => {
    try
    {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(process.env.PORT, () => 
        {
            console.log(`Сервер запущен на порту ${process.env.PORT}.`);
        });
    }
    catch (e)
    {
        console.log(e);
    }
}
start();

const ProcessFiles = async () =>
{
    if (file_process_lock)
        return;
    file_process_lock = true;
    let files = await models.files.findAll({where: {status: 1}});
    if (files.length == 0)
    {
        file_process_lock = false;
        return;
    }
    await models.data.destroy({where: {}});
    console.log('\nТаблица data очищена');
    for (let file of files)
    {
        let f = file.dataValues;
        let workbook = new Excel.Workbook();
        try
        {
            await workbook.xlsx.readFile(f.path);
            let worksheet = workbook.getWorksheet("Реестр");
            let line = 8;
            let row = worksheet.getRow(line);
            while (row._cells.length >= 2) //погрешность на случай если некоторые значения указаны не будут
            {
                let d = [],
                    fk = ["municipal_knowledge", "city_type", "city_name", "street_type",
                        "street_name", "founded_address", "building_number", "constructive_element_group"],
                    normal_fields = ["capital_repair_year", "repair_cost_preview", "repair_end_year",
                                    "federal_budget", "regional_budget", "local_budget"],
                    entry = {
                        municipal_area: d[0]
                    };
                if (entry.municipal_area == undefined)
                    entry.municipal_area = null;
                for (let k = 1; k < 16; k++)
                {
                    let value = row.getCell(k).value;
                    if (k > 9)
                    {
                        if (value != null)
                            value = value.replace(',', '.');
                        value = parseFloat(value);
                    }
                    d.push(value);
                }
                for (let m = 0; m < normal_fields.length; m++)
                {
                    if (d[m + 9] == undefined)
                        entry[normal_fields[m]] = null;
                    entry[normal_fields[m]] = d[m + 9];
                }
                for (let i = 0; i < fk.length; i++)
                {
                    let key = await models[fk[i]].findOne({where: {name: d[i + 1]}});
                    if (key == null)
                    {
                        await models[fk[i]].create({name: d[i + 1]});
                        i--;
                        continue;
                    }
                    entry[fk[i]] = key.dataValues.id;
                }
                await models.data.create(entry);
                line++;
                row = worksheet.getRow(line);
            }
            await models.files.update(
                {status: 2},
                {where: {id: f.id}}
            );
            console.log(`\nОбработка файла ${f.name} завершена успешно.`);
            file_process_lock = false;
        }
        catch (e)
        {
            await models.files.update(
                {status: 3},
                {where: {id: f.id}}
            );
            console.log(e.message);
            console.log('\nОбработка файла завершилась с ошибкой.');
            file_process_lock = false;
        }
    }
}
ProcessFiles();
setInterval(ProcessFiles, 60000);