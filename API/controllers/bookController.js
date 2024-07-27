const Book = require('../models/book');
const bookService = require('../services/bookService');

const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find({availableCount: { $gt: 0 } });
        return res.json(books);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


const createBook = async (req, res) => {
    try {
        const bookData = req.body;
        const newBook = await bookService.createBook(bookData);
        res.status(201).json({ message: 'Book created successfully', data: newBook });
    } catch (error) {
        res.status(500).json({ message: 'Error creating book', error: error.message });
    }
};

module.exports = { createBook, getAllBooks };


// Implement other controller functions for updating, deleting, and retrieving individual books as needed
