const express = require('express');
const userRouter = require('./routes/user.routes');

const PORT = process.env.PORT || 3001;

const app = express();

//Настраиваем пути для api
app.use(express.json());
app.use('/api', userRouter);

//Запускаем созданный сервер
app.listen(PORT, () => console.log(`server started on port ${PORT}`));
