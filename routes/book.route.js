
const express = require('express');
const app =express();
app.use(express.json());
const booksController = require('../controller/book.controller');
const {authorize} = require('../controller/auth.controller');

app.get('/', booksController.getAllBooks);
app.post('/find', booksController.findBook);
app.post('/',[authorize], booksController.addBook);
app.put('/:bookID',[authorize], booksController.updateBook);
app.delete('/:bookID',[authorize], booksController.deleteBook);

module.exports = app;

