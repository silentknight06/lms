const adminService = require('../services/adminService');

class AdminController {
  getAdminGreeting(req, res) {
    const greeting = adminService.greetAdmin();
    res.send(greeting);
  }
  createAdminUser = async (req, res) => {
    try {
        const newAdminUser = new AdminUser(req.body);
        await newAdminUser.save();
        res.status(201).json({ message: 'Admin user created successfully', data: newAdminUser });
    } catch (error) {
        res.status(500).json({ message: 'Error creating admin user', error: error.message });
    }
}
}

module.exports = new AdminController();
