const express = require('express');
const userRouter = require('./routes/user.routes');
const characterRouter = require('./routes/character.routes');
const resourceRouter = require('./routes/resource.routes');

const PORT = process.env.PORT || 3001;

const app = express();

//Настраиваем пути для api
app.use(express.json());
app.use('/api', userRouter, characterRouter, resourceRouter);

//Фикс для CORS при локлаьной работе
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200/');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

//Запускаем созданный сервер
app.listen(PORT, () => console.log(`server started on port ${PORT}`));
