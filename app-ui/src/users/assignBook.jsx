import * as React from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const AssignBook = () => {
  const [users, setUsers] = React.useState([]); // State for users
  const [books, setBooks] = React.useState([]); // State for books
  const [selectedUser, setSelectedUser] = React.useState(''); // Selected user
  const [selectedBook, setSelectedBook] = React.useState(''); // Selected book
  const [dueDate, setDueDate] = React.useState(''); // Due date
  const navigate = useNavigate();

  // Fetch users and books data on component mount
  React.useEffect(() => {
    const fetchUsersAndBooks = async () => {
      try {
        const userResponse = await axios.get(process.env.REACT_APP_API_URL + '/users/getAll'); // Update with your API URL
        const bookResponse = await axios.get(process.env.REACT_APP_API_URL + '/books/getAll'); // Update with your API URL
        setUsers(userResponse.data);
        setBooks(bookResponse.data);
      } catch (error) {
        console.error('Error fetching users or books:', error);
      }
    };

    fetchUsersAndBooks();
  }, []);

  const handleAssignBook = async () => {
    if (dueDate) {
      const assignmentData = {
        userId: selectedUser,
        bookId: selectedBook,
        dueDate: dueDate,
        status:"borrowed"
      };

      try {
        const response = await axios.post(process.env.REACT_APP_API_URL + '/transaction/assign', assignmentData);
        if (response.status === 201) {
          alert("Book Assigned Successfully!");
          // You can also redirect or reset the form here if needed
          navigate('/admin/history')
          
        }
      } catch (error) {
        alert("Error assigning book: " + error.response.data.message);
        console.error('Error assigning book', error);
      }
    } else {
      alert('Please select a due date.');
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };
    const today = new Date().toISOString().split('T')[0];


  return (
    <Box className='create-user'>
      <Button
        variant="text"
        startIcon={<ArrowBackIcon />}
        onClick={handleGoBack}
      >
        Back
      </Button>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '350px', margin: 'auto' }} onSubmit={handleAssignBook}>
        <FormControl fullWidth>
          <InputLabel id="user-select-label">Select User</InputLabel>
          <Select
            labelId="user-select-label"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            label="Select User"
            required
          >
            {users.map((user) => (
              <MenuItem key={user._id} value={user._id}>
                {user.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="book-select-label">Select Book</InputLabel>
          <Select
            labelId="book-select-label"
            value={selectedBook}
            onChange={(e) => setSelectedBook(e.target.value)}
            label="Select Book"
            required
          >
            {books.map((book) => (
              <MenuItem key={book._id} value={book._id}>
                {book.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          type="date"
        //   label="Due Date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
        }}
        // Set the minimum date to today
        inputProps={{
            min: today, // Prevent past dates
        }}
        />

        <Button variant="contained" type='submit'>Assign Book</Button>
        <Button
          variant="contained"
          color="secondary" // Default: usually a light purple; can be customized
          onClick={() => navigate('/admin/dashboard')}
          sx={{ width: '100%' }}
        >
          Go To Dashboard
        </Button>
      </form>
    </Box>
  );
};

export default AssignBook;
