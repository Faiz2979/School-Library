const express = require('express');
const app = express();

app.use(express.json());

const borrowController = require('../controller/borrow.controller');

app.post('/', borrowController.addBorrowing);
app.put('/:borrowID', borrowController.updateBorrowing);
app.delete('/:borrowID', borrowController.deleteBorrowing);
app.get('/return/:borrowID', borrowController.returnBook);
app.get('/', borrowController.getAllBorrowing);

module.exports = app;