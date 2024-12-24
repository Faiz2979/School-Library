const express = require('express');
const app = express();

app.use(express.json());
const borrowController = require('../controller/borrow.controller');
const {authorize} = require('../controller/auth.controller');

app.post('/',[authorize], borrowController.addBorrowing);
app.put('/:borrowID',[authorize], borrowController.updateBorrowing);
app.delete('/:borrowID',[authorize], borrowController.deleteBorrowing);
app.get('/return/:borrowID',[authorize], borrowController.returnBook);
app.get('/', borrowController.getBorrow);
app.get('/total', borrowController.getTotalBorrowedBooks);

module.exports = app;