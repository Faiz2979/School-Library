
const express = require('express');
const app =express();

let {validateMember} = require('../middleware/member-validation');

app.use(express.json());
const memberController = require('../controller/member.controller');
const {authorize} = require('../controller/auth.controller');

app.get('/', memberController.getAllMember);
app.post('/find',[validateMember], memberController.findMember);
app.post('/',[validateMember], memberController.addMember);
app.put('/:memberID',[validateMember], memberController.updateMember);
app.delete('/:memberID', memberController.deleteMember);

module.exports = app;

