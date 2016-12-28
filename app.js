const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const bodyParser = require('body-parser');

mongoose.Promise = global.Promise;

if(process.env.NODE_ENV !== 'test') {
  mongoose.connect('mongodb://localhost/muber');
}

const app = express();
app.use(bodyParser.json());

routes(app);

app.use((err, req, res, next) => {
  res.status(422).json({ error:err.message });
});

module.exports = app;
