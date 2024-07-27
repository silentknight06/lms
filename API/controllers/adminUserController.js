const adminUserService = require('../services/adminUserService');

class AdminUserController {
    async getAdminUser(req, res) {
        try {
            const adminUserId = req.params.adminUserId;
            const adminUser = await adminUserService.getAdminUserById(adminUserId);
            res.json(adminUser);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async createAdminUser(req, res) {
        try {
           const newAdminUser =   await adminUserService.createAdminUser(req.body);
            res.status(201).json(newAdminUser);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async editAdminUser(req, res) {
        try {
            const adminUserId = req.params.adminUserId;
            const updatedAdminUser = await adminUserService.editAdminUser(adminUserId, req.body);
            res.json(updatedAdminUser);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteAdminUser(req, res) {
        try {
            const adminUserId = req.params.adminUserId;
            const deletedAdminUser = await adminUserService.deleteAdminUser(adminUserId);
            res.json(deletedAdminUser);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async authenticateAdminUser(req, res) {
        try {
            const { email, password } = req.body;
            const authenticatedAdminUser = await adminUserService.login(email, password);
            console.log(authenticatedAdminUser)
            if (authenticatedAdminUser) {
                res.status(200).json(authenticatedAdminUser);
            } else {
                res.status(401).json({ error: "Invalid username or password" });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }


login = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const result = await adminUserService.login(email, password);
        
        if (result.error) {
            return res.status(result.status).json({ message: result.message });
        }

        // Send success response
        res.status(200).json({ 
            message: 'Login successful', 
            token: result.token, 
            admin: result.admin 
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

}

module.exports = new AdminUserController();
