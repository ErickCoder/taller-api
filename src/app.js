const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const appError = require('./utils/appError');
const errorController = require('./controllers/error.controller');
//Routes

const usersRoutes = require('./routes/users.route');
const repairsRoutes = require('./routes/repairs.route');

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

//Routes
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/repairs', repairsRoutes);

//appALL
app.all('*', (req, res, next) => {
  return next(
    new appError(`Cant find ${req.originalUrl} on this server!`, 404)
  );
});
//global Error
app.use(errorController);
module.exports = app;
