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
  { field: 'returnedDate', headerName: 'Book Return Date', width: 150 },
  { field: 'status', headerName: 'Current Status', width: 150 },
  
];

export default function ChangeBookStatus() {
  const [rows, setRows] = React.useState([]);
  const [filteredRows, setFilteredRows] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedIds, setSelectedIds] = React.useState([]);
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

          returnedDate:new Date(transaction.returnedDate).toLocaleDateString(),
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

  const handleSelectionChange = (newSelection) => {
    console.log(newSelection)
    setSelectedIds(newSelection);
  };

  const handleReturnBooks = async () => {
    // API call to mark books as returned
    try {
      const returnDate = new Date().toISOString(); // Get the current date as return date
      const response = await axios.post(process.env.REACT_APP_API_URL + '/transaction/status', {
        Ids: selectedIds,
        returnedDate: returnDate,
        status:'returned'
      });

      if (response.status === 200) {
        alert('Books returned successfully!');
        fetchHistory(); // Refresh the history after returning books
      }
    } catch (error) {
      console.error('Error returning books:', error);
      alert('Failed to return books.');
    }
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
        color="secondary"
        onClick={() => navigate('/admin/dashboard')}
        sx={{ margin: '0.5rem'}}
      >
        Go To Dashboard
      </Button>

      {/* Button to Return Books */}
      <Button
        variant="contained"
        color="primary" // You can choose a different color here
        onClick={handleReturnBooks}
        disabled={selectedIds.length === 0} // Disable button if no rows are selected
        sx={{ margin: '0.5rem'}}
      >
        Book Returned
      </Button>

      <div style={{ minHeight: 300, height: 450, width: '100%' }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        checkboxSelection    
    onRowSelectionModelChange={(e)=>handleSelectionChange(e)}
      rowSelectionModel={selectedIds}

        getRowId={(row) => row.id}
        onRowClick={(params) => handleSelectionChange(params.row.username)} // Handle row click
          />
        </div>
      </Box>
    );
  }
  