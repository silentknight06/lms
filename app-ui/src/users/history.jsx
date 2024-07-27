import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, TextField } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const columns = [
  { field: 'username', headerName: 'UserId', width: 250 },
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'bookName', headerName: 'Book Name', width: 200 },
  { field: 'authorName', headerName: 'Author Name', width: 150 },
  { field: 'borrowedTill', headerName: 'Borrowed Till', width: 200 },
  { field: 'status', headerName: 'Current Status', width: 150 },
];

export default function HistoryTable() {
  const [rows, setRows] = React.useState([]);
  const [filteredRows, setFilteredRows] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const navigate = useNavigate();

  const fetchHistory = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_API_URL + '/transaction/getHistory');
      if (response.status === 200) {
        const formattedData = response.data.map(transaction => ({
          id: transaction._id,
          username: transaction.userId.username,
          name: transaction.userId.name,
          status: transaction.status,
          bookName: transaction.bookId.name,
          authorName: transaction.bookId.author,
          borrowedTill: new Date(transaction.dueDate).toLocaleDateString(),
        }));
        setRows(formattedData);
        setFilteredRows(formattedData); // Initialize filtered rows
      }
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };

  React.useEffect(() => {
    fetchHistory();
  }, []);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter the rows based on the search query
    const filtered = rows.filter(row => {
      return (
        row.username.toLowerCase().includes(query) ||
        row.name.toLowerCase().includes(query) ||
        row.bookName.toLowerCase().includes(query) ||
        row.authorName.toLowerCase().includes(query)
      );
    });

    setFilteredRows(filtered);
  };

  const handleNavigate = (route) => {
    navigate(`/${route}`);
  };

  return (
    <Box className='create-user'>
      {/* Search Bar */}
      <TextField
        variant="outlined"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearch}
        size='small'
        sx={{ margin: '0.5rem', width: '300px' }}
      />
      <Button
          variant="contained"
          color="secondary" // Default: usually a light purple; can be customized
          onClick={() => navigate('/admin/dashboard')}
          sx={{ margin: '0.5rem'}}

          // sx={{ width: '100%' }}
        >
          Go To Dashboard
        </Button>
      <div style={{ minHeight: 300, height: 450, width: '100%' }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          checkboxSelection
          getRowId={(row) => row.id}
        />
      </div>
    </Box>
  );
}
