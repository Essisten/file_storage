require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const models = require('./models/init-models');
const cors = require('cors');
const router = require('./routes/index');
const error_handler = require('./errors/middleware');
const Excel = require('exceljs');
const app = express();

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
    let files = await models.files.findAll({where: {status: 1}});
    for (let file of files)
    {
        let f = file.dataValues;
        let workbook = new Excel.Workbook();
        try
        {
            await workbook.xlsx.readFile(f.path);
        }
        catch (e)
        {
            console.log(e.message);
            continue;
        }
        let worksheet = workbook.getWorksheet("Реестр");
        let line = 8
        let row = worksheet.getRow(line);
        while (row._cells.length >= 2) //погрешность на случай если некоторые значения указаны не будут
        {
            let d = [];
            for (let k = 2; k < 16; k++)
            {
                d.push(row.getCell(k));
            }
            
            line++;
        }
    }
}
ProcessFiles();
//setInterval(ProcessFiles, 6000);