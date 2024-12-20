const express = require('express');
const app = express();
app.use(express.json());

const { autenticate } = require('../controller/auth.controller'); // Destructure the function from the object

app.post('/login', autenticate);

module.exports = app;
