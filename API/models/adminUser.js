const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const adminUserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique:true },
    contactNumber: { type: String, required: true },
    role: { type: String, default: "admin" },
    createdBy: { type: String, required: false } // Assuming createdBy will store user's email


});

adminUserSchema.pre('save', async function (next) {
    try {
        if (this.isModified('password')) {
            const hashedPassword = await bcrypt.hash(this.password, 10);
            this.password = hashedPassword;
        }
        next();
    } catch (error) {
        next(error);
    }
});

adminUserSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};


  

module.exports = mongoose.model('AdminUser', adminUserSchema);
