const Book = require('../models/book');

const createBook = async (bookData) => {
    const book = new Book(bookData);
    return await book.save();
};

module.exports = { createBook };
