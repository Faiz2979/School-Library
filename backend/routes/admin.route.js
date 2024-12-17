
const express = require('express');
const app =express();

app.use(express.json());
const adminsController = require('../controller/admin.controller');
const {authorize} = require('../controller/auth.controller');

app.get('/',[authorize], adminsController.showAdmins);
app.post('/find',[authorize], adminsController.findAdmin);
app.post('/',[authorize], adminsController.addAdmin);
app.put('/:adminID',[authorize], adminsController.updateAdmin);
app.delete('/:adminID',[authorize], adminsController.removeAdmin);

module.exports = app;

