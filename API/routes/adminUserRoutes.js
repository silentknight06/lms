const express = require('express');
const router = express.Router();
const adminUserController = require('../controllers/adminUserController');

router.get('/:adminUserId', adminUserController.getAdminUser);
router.post('/create', adminUserController.createAdminUser);
router.put('/:adminUserId', adminUserController.editAdminUser);
router.delete('/:adminUserId', adminUserController.deleteAdminUser);
router.post('/login', adminUserController.authenticateAdminUser);

module.exports = router;
