const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['borrowed', 'returned', 'overdue'],
        default: 'borrowed'
    },
    returnedDate:{
        type: Date,
        required:false
    }
});

module.exports = mongoose.model('Transaction', transactionSchema);
