const Transaction = require('../models/transactionModel');
// const Book = require('../models/Book');
const User = require('../models/user')


const createTransaction = async (transactionData) => {
    console.log("createTransaction ", transactionData)
    const transaction = new Transaction(transactionData);
    return await transaction.save();
};

const getUserTransactionHistory = async () => {
    // Fetch transactions of the user based on their email
    const transactions = await Transaction.find()
        .populate('userId', 'username name') // Populate username and name from User model
        .populate('bookId', 'name author status')   // Populate book details from Book model
        .select('userId bookId dueDate status returnedDate') // Select the desired fields
        .lean(); // This will convert the documents to plain JavaScript objects

    return transactions
};

const getUserSpecificTransactionHistory = async (username) => {
  try {
      // Fetch the user document based on the username
      const user = await User.findOne({ username });
      if (!user) {
          // If the user is not found, return an empty array
          return [];
      }

      // Fetch the transactions of the user based on the userId
      const transactions = await Transaction.find({ userId: user._id })
          .populate('userId', 'username name') // Populate username and name from User model
          .populate('bookId', 'name author status') // Populate book details from Book model
          .lean(); // Convert documents to plain JavaScript objects

      return transactions;
  } catch (error) {
      console.error('Error fetching user transaction history:', error);
      throw error; // Re-throw the error to handle it further up the stack if necessary
  }
};



const changeTransactionStatus = async (Ids, returnedDate, status) => {
  try {
    // Update the transaction status
    console.log(Ids, returnedDate, status)
    await Transaction.updateMany(
      { _id: { $in: Ids } },
      { $set: { status, returnedDate } }
    );

    // Fetch the book IDs from the updated transactions
    // const transactions = await Transaction.find({ _id: { $in: Ids } });
    // const bookIds = transactions.map((transaction) => transaction.bookId);

    // // Increase the count of each book by 1
    // await Promise.all(
    //   bookIds.map(async (bookId) => {
    //     const book = await Book.findById(bookId);
    //     book.count += 1;
    //     await book.save();
    //   })
    // );
    console.log('here')
    return true
  } catch (error) {
    throw new Error(`Error changing transaction status: ${error.message}`);
  }
};



module.exports = { createTransaction ,getUserTransactionHistory, getUserSpecificTransactionHistory, changeTransactionStatus};
