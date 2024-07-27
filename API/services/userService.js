const User = require('../models/user');
const jwt = require('jsonwebtoken');

class UserService {
    async getUserById(userId) {
        return await User.findById(userId);
    }

      // Fetch all users from the database
      async getAllUsers() {
          try {
              const users = await User.find(); // Assumes User is a Mongoose model for your users
              return users;
          } catch (error) {
              throw new Error('Error fetching users: ' + error.message);
          }
      }

    async editUser(userId, newData) {
        return await User.findByIdAndUpdate(userId, newData, { new: true });
    }

    async deleteUser(userId) {
        return await User.findByIdAndDelete(userId);
    }
    createUser = async (userData) => {
        try {
            const user = new User(userData);
            await user.save();
            return user;
        } catch (error) {
            throw new Error('Error creating user');
        }
    };

    login = async (username) => {
        try {
          console.log("username ", username)
            const user = await User.findOne({ username });
          if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
          // Assuming you have the user's role stored in the 'role' field
          const token = jwt.sign({ username: user.username, email: user.email, role: user.role }, 'sfdafdlkjljj1d343', { expiresIn: '1h' });
         console.log('token')
          return { message: 'Login successful', token:token, role:user.role , username: user.username, email: user.email};
        } catch (error) {
          throw new Error('Error while log-in');
        }
      };
    
}

module.exports = new UserService();
