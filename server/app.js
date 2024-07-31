require('dotenv').config();
const express = require('express');

const app = express()
const PORT = process.env.PORT ?? 3000;

app.listen(PORT, ()=> console.log(`Я перепутала, думала, что на порте, но оказалось неправильно, ${PORT} пересмотрела, как итог - оставила))`))
