const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// router.get('/:id', userController.getUser);
router.put('/:id', userController.editUser);
router.delete('/:id', userController.deleteUser);
router.post('/create', userController.createUser);
router.get('/login', userController.userLogin )
router.get('/getAll', userController.getAllUsers)

module.exports = router;
