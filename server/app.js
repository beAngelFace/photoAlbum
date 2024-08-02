require('dotenv').config();
const express = require('express');
const apiRouter = require("./routes/api.routes");
const serverConfig = require('./config/serverConfig');

const app = express()
const PORT = process.env.PORT ?? 3000;
//конфигурация
serverConfig(app)
// Маршрутизация
app.use('/api', apiRouter);

app.listen(PORT, ()=> console.log(`Успешное подключение к ${PORT} порту`))
