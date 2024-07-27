const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    contactNumber: { type: String, required: true },
    role: { type: String, default: "student" },
    createdBy: { type: String, required: false } // Assuming createdBy will store user's email

});

module.exports = mongoose.model('User', userSchema);
