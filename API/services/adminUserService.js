const AdminUser = require('../models/adminUser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


class AdminUserService {
    async getAdminUserById(adminUserId) {
        return await AdminUser.findById(adminUserId);
    }

    // async createAdminUser(userData) {
    //     return await AdminUser.create(userData);
    // }
    async createAdminUser(userData) {
        try {
            const  email  = userData.email;
            
            // Check if a user with the provided email already exists
            const existingUser = await AdminUser.findOne({ email });
            console.log("existingUser", existingUser)
    
            if (existingUser) {
                return res.status(400).json({ message: 'User with this email already exists' });
            }
            const username = userData.username
            const existingUsernameUser = await AdminUser.findOne({ username });
        if (existingUsernameUser) {
            return res.status(400).json({ message: 'User with this username already exists' });
        }
            // If the user doesn't exist, proceed with creating a new admin user
            const newAdminUser = new AdminUser(userData);

            await newAdminUser.save();
            return newAdminUser
            
        } catch (error) {
            return res.status(500).json({ message: 'Error creating admin user', error: error.message });
        }
    };
    async editAdminUser(adminUserId, newData) {
        return await AdminUser.findByIdAndUpdate(adminUserId, newData, { new: true });
    }

    async deleteAdminUser(adminUserId) {
        return await AdminUser.findByIdAndDelete(adminUserId);
    }

    async authenticateAdminUser(email, password) {
        const user = await AdminUser.findOne({ email });
        if (user && await user.comparePassword(password)) {
            return user;
        }
        return null;
    }

    login = async (email, password) => {
        // Find the admin user by email
        const adminUser = await AdminUser.findOne({ email });
        
        // Check if the user exists
        if (!adminUser) {
            return { error: true, status: 401, message: 'Invalid email or password' };
        }
    
        // Compare password
        const isMatch = await adminUser.comparePassword(password);
        if (!isMatch) {
            return { error: true, status: 401, message: 'Invalid email or password' };
        }
    
        // Create a JWT token
        const token = jwt.sign({ id: adminUser._id, email:adminUser.email,role: adminUser.role }, "wsdfjklasjdflk122423", {
            expiresIn: '1h', // Token validity
        });
    
        return {
            error: false,
            token:token,
            name:adminUser.name,
            role:adminUser.role,
            email:adminUser.email,
            username:adminUser.username
        };
    };
}

module.exports = new AdminUserService();
