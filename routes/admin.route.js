
const express = require('express');
const app =express();

app.use(express.json());
const adminsController = require('../controller/admin.controller');

app.get('/', adminsController.showAdmins);
app.post('/find', adminsController.findAdmin);
app.post('/', adminsController.addAdmin);
app.put('/:adminID', adminsController.updateAdmin);
app.delete('/:adminID', adminsController.removeAdmin);

module.exports = app;

