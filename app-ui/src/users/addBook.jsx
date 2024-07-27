import * as React from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const AddBook = () => {
  const [bookName, setBookName] = React.useState('');
  const [author, setAuthor] = React.useState('');
  const [status, setStatus] = React.useState('available');
  const [count, setCount] = React.useState(1);
  const navigate = useNavigate();

  const handleCreateBook = async () => {
    if (count > 0) {
    const bookData = {
      name: bookName,
      author: author,
      status: status,
      availableCount: count
    };

    try {
      const response = await axios.post(process.env.REACT_APP_API_URL + '/books/add', bookData);
      if (response.status === 201) {
        alert("Book Added !");
        // Additional logic upon successful book creation
        return;
      }
    } catch (error) {
      alert("Error creating book: " + error.response.data.message);
      console.error('Error creating book', error);
      return;
    }
  } else {
    // Provide user feedback that count should be a positive number
    // You can display an error message or prevent further action
    alert('Count should be a positive number');
  }
  };

  const handleCountChange = (event) => {
    const newCount = parseInt(event.target.value);
    setCount(newCount);

  
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Box className='create-user'>
      <Button
        variant="text"
        startIcon={<ArrowBackIcon />}
        onClick={handleGoBack}
      >
        Back
      </Button>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '350px', margin: 'auto' }} onSubmit={handleCreateBook}>
        <TextField
          label="Book Name"
          value={bookName}
          onChange={(e) => setBookName(e.target.value)}
          required
        />
        <TextField
          label="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <FormControl>
          <InputLabel id="status-label">Status</InputLabel>
          <Select
            labelId="status-label"
            id="status-select"
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <MenuItem value="available">Available</MenuItem>
            {/* <MenuItem value="checked-out">Checked Out</MenuItem> */}
          </Select>
        </FormControl>
        <TextField
          type="number"
          label="Count"
          value={count}
          onChange={(e)=> handleCountChange(e)}
        />
        <Button variant="contained" type='submit'>Add Book</Button>
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

export default AddBook;
