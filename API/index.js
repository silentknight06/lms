
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors package

const bookRoutes = require('./routes/books');
const userRoutes = require('./routes/users');
const adminUserRoutes = require('./routes/adminUserRoutes');
const libraryTransactionRoutes = require('./routes/transactionRoutes');
const {seedAdminUsers, seedUsers} = require('./utils')
const app = express();
const port = process.env.PORT || 8000 ;

app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes


mongoose.connect('mongodb://localhost:27017/library', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        // app.listen(port, () => {
        //     console.log(`Server started on http://localhost:${port}`);
        // });
    })
    .catch(error => console.error('Error connecting to MongoDB:', error));

app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminUserRoutes);
app.use('/api/transaction', libraryTransactionRoutes);
// seedAdminUsers()
// seedUsers()

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Online Library Management System');
});


app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});

// module.exports = app;
