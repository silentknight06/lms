const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['available', 'checkedOut', 'onHold'],
        default: 'available'
    },
    availableCount: {
        type: Number,  // Change to Number for count
        required: true,
        min: [1, 'Available count must be at least 1.'] // Validation to not accept less than 1
    }
});

module.exports = mongoose.model('Book', bookSchema);
