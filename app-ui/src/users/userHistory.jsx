import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const columns = [
  { field: 'username', headerName: 'UserId', width: 150 },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'bookName', headerName: 'Book Name', width: 200 },
  { field: 'authorName', headerName: 'Author Name', width: 150 },
  { field: 'borrowedTill', headerName: 'Borrowed Till', width: 200 },
  { field: 'status', headerName: 'Current Status', width: 150 },
];

export default function UserHistory() {
  const [rows, setRows] = React.useState([]);
  const [filteredRows, setFilteredRows] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [userHistory, setUserHistory] = React.useState([]); // Store selected user's history
  const [openDialog, setOpenDialog] = React.useState(false); // Manage dialog visibility
  const navigate = useNavigate();

  const fetchHistory = async () => {
    try {
      const username = sessionStorage.getItem('username')
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/transaction/getuserHistory`,{
        params:{
          username:username
        }
      });
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

  const handleUserClick = async (username) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/transaction/getuserHistory`,{
        params:{
          username:username
        }
      });
      if (response.status === 200) {
        // Assume response.data is the history of the user based on the username
        setUserHistory(response.data);
        setOpenDialog(true); // Show dialog with user history
      }
    } catch (error) {
      console.error('Error fetching user history:', error);
    }
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
        sx={{ marginBottom: '1rem', width: '300px' }}
        size='small'
      />
   
      <div style={{ minHeight: 300, height: 450, width: '100%' }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          checkboxSelection
          getRowId={(row) => row.id}
          onRowClick={(params) => handleUserClick(params.row.username)} // Handle row click
        />
      </div>
      
</Box>
  )
}       
