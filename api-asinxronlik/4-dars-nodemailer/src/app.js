const express = require('express');
const mailRoutes = require('./routes/mail.routes');

const app = express();

app.use(express.json());

app.use('/mail', mailRoutes);

module.exports = app;
