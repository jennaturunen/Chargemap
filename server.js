'use strict';
require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./db');

app.use(express.urlencoded({ extended: false })); // for parsing html form x-www-form-urlencoded
app.use(express.json()); // for parsing application/json

app.use('/station', require('./router'));

db.on('connected', () => {
  app.listen(3000, () => {
    console.log('express server started on port 3000');
  });
});
