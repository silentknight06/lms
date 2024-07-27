const userService = require('../services/userService');

class UserController {
    async getUser(req, res) {
        try {
            const userId = req.params.userId;
            const user = await userService.getUserById(userId);
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getAllUsers(req, res) {
        try {
            const users = await userService.getAllUsers(); // Fetch all users from the service
            res.json(users); // Send the list of users in the response
        } catch (error) {
            res.status(500).json({ error: error.message }); // Handle any errors that occur
        }
    }

    async editUser(req, res) {
        try {
            const userId = req.params.userId;
            const updatedUser = await userService.editUser(userId, req.body);
            res.json(updatedUser);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteUser(req, res) {
        try {
            const userId = req.params.userId;
            const deletedUser = await userService.deleteUser(userId);
            res.json(deletedUser);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

 createUser = async (req, res) => {
    try {
        const userData = req.body;
        const user = await userService.createUser(userData);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
userLogin = async(req, res)=>{
    try{
    const response =  await userService.login(req.query.username)
    res.status(200).json(response)
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
};

}

module.exports = new UserController();
