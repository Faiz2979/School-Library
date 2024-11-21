
const express = require('express');
const app =express();
const {midOne} = require('../middleware/simple.middleware');
app.use(express.json());
const booksController = require('../controller/book.controller');

app.get('/',[midOne], booksController.getAllBooks);
app.post('/find', booksController.findBook);
app.post('/', booksController.addBook);
app.put('/:bookID', booksController.updateBook);
app.delete('/:bookID', booksController.deleteBook);

module.exports = app;

