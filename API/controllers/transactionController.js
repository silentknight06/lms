const transactionService = require('../services/transactionService');
// const Book = require('../models/Book');

const createTransaction = async (req, res) => {
    try {
        const { userId, bookId, dueDate , status} = req.body;
        const transactionData = { userId, bookId, dueDate, status };
      
        // Create transaction using the service
        const newTransaction = await transactionService.createTransaction(transactionData);
        return res.status(201).json({ message: 'Transaction created successfully', data: newTransaction });
    } catch (error) {
        return res.status(500).json({ message: 'Error creating transaction', error: error.message });
    }
};
const getTransactionHistory = async (req, res) => {
    // const email = req.query.email;
    
    try {
        const transactionHistory = await transactionService.getUserTransactionHistory();
        res.status(200).json(transactionHistory);
    } catch (error) {
        console.error('Error fetching transaction history:', error);
        res.status(500).json({ message: 'Error fetching transaction history', error: error.message });
    }
};

const getUserSpecificsTransactionHistory = async (req, res) => {
    
    try {
        const transactionHistory = await transactionService.getUserSpecificTransactionHistory(req.query.username);
        res.status(200).json(transactionHistory);
    } catch (error) {
        console.error('Error fetching transaction history:', error);
        res.status(500).json({ message: 'Error fetching transaction history', error: error.message });
    }
};

const changeTransactionStatus = async (req, res) => {
    try {
      const { Ids, returnedDate, status } = req.body;
      console.log(req.body)
      const response = await transactionService.changeTransactionStatus(Ids, returnedDate, status);
      res.status(200).json({ message: 'Transaction status updated successfully', data:response });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


module.exports = { createTransaction,getTransactionHistory, getUserSpecificsTransactionHistory, changeTransactionStatus };


