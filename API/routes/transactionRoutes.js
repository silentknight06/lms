const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

// Route to create a transaction
router.post('/assign', transactionController.createTransaction);
router.get('/getHistory', transactionController.getTransactionHistory);
router.get('/getuserHistory', transactionController.getUserSpecificsTransactionHistory)
router.post('/status', transactionController.changeTransactionStatus);


module.exports = router;
