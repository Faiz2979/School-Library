const bookModel = require('../models/index').book;
const Op = require('sequelize').Op;
const path = require('path');
const fs = require('fs');

const upload = require('../cover/up-cover').single('cover');

// Fetch all books
exports.getAllBooks = async (req, res) => {
    let books = await bookModel.findAll();
    return res.json({
        success: true,
        data: books,
        message: 'Books fetched successfully'
    });
};

// Find book by keyword
exports.findBook = async (req, res) => {
    let keyword = req.body.keyword;
    if (!keyword) {
        return res.status(400).json({
            success: false,
            message: 'Keyword is required'
        });
    }
    let books = await bookModel.findAll({
        where: {
            [Op.or]: [
                { isbn: { [Op.substring]: keyword } },
                { title: { [Op.substring]: keyword } },
                { author: { [Op.substring]: keyword } },
                { category: { [Op.substring]: keyword } },
                { publisher: { [Op.substring]: keyword } }
            ]
        }
    });
    return res.json({
        success: true,
        data: books,
        message: 'Books fetched successfully'
    });
};

// Add a new book
exports.addBook = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: err.message+"TESSSSSSSSSSSs" || err });
        }

        if (!req.file) {
            return res.status(400).json({ message: 'Please select a file to upload' });
        }

        let newBook = {
            isbn: req.body.isbn,
            title: req.body.title,
            author: req.body.author,
            publisher: req.body.publisher,
            category: req.body.category,
            stock: req.body.stock,
            cover: req.file.filename
        };

        try {
            const result = await bookModel.create(newBook);
            return res.json({
                success: true,
                message: 'Book added successfully',
                data: result
            });
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    });
};


// Update an existing book
exports.updateBook = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.json({ message: err });
        }

        let bookID = req.params.bookID;
        let book = {
            isbn: req.body.isbn,
            title: req.body.title,
            author: req.body.author,
            publisher: req.body.publisher,
            category: req.body.category,
            stock: req.body.stock
        };

        if (req.file) {
            const selectedBook = await bookModel.findOne({ where: { bookID: bookID } });
            const oldCoverBook = selectedBook.cover;
            const pathCover = path.join(__dirname, `../cover/${oldCoverBook}`);

            if (fs.existsSync(pathCover)) {
                fs.unlinkSync(pathCover, err => console.log(err));
            }

            // Update the book cover if a new file is uploaded
            book.cover = req.file.filename;
        }

        bookModel.update(book, { where: { bookID: bookID } })
            .then(result => {
                return res.json({
                    success: true,
                    message: 'Book updated successfully'
                });
            })
            .catch(err => {
                return res.json({
                    success: false,
                    message: err.message
                });
            });
    });
};

// Delete a book
exports.deleteBook = async (req, res) => {
    const bookID = req.params.bookID;
    const book = await bookModel.findOne({ where: { bookID: bookID } });

    if (book) {
        const oldCoverBook = book.cover;
        const pathCover = path.join(__dirname, `../cover/${oldCoverBook}`);

        if (fs.existsSync(pathCover)) {
            fs.unlink(pathCover, err => console.log(err));
        }

        bookModel.destroy({ where: { bookID: bookID } })
            .then(result => {
                return res.json({
                    success: true,
                    message: 'Book deleted successfully'
                });
            })
            .catch(err => {
                return res.json({
                    success: false,
                    message: err.message
                });
            });
    } else {
        return res.json({
            success: false,
            message: 'Book not found'
        });
    }
};
