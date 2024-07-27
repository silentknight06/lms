import * as React from 'react';
import  {DataGrid}  from '@mui/x-data-grid';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate to handle navigation
import axios from 'axios';
import { Box, Button } from '@mui/material';


const columns = [
  // { field: 'id', headerName: 'ID', width: 90 ,sortable: true},
  { field: 'username', headerName: 'Username', width: 150 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'createdAt', headerName: 'Created At', width: 250 },
  { field: 'createdBy', headerName: 'Created By', width: 200 },
  { field: 'role', headerName: 'Role', width: 120 },
];


export default function UserListTable() {
  

  const getAllUsers =async () =>{
      const res =await axios.get(process.env.REACT_APP_API_URL+"currentUser",{params:{
      "email":sessionStorage.getItem("email")
    }})
    if(res.status === 200){
      console.log("resdata", res.data)
      setRows(res.data)
    }
  }
  

const [rows, setRows] = React.useState([])
const [selectionModel, setSelectionModel] = React.useState([])
const [sortModel, setSortModel] = React.useState([
  {
    field: 'createdAt',
    sort: 'desc', // 'asc' for ascending, 'desc' for descending
  },
]);
const handleSelection = (ids) =>{
  const selectedIDs = new Set(ids);
  const selectedRows = rows.filter((row: any) =>
    selectedIDs.has(row.id)
  );
  setSelectionModel(selectedRows);
}

const handleDelete = async() =>{
  if (selectionModel.length === 0){
    alert("Users not selected !")
    return 
  }
  let userIds = selectionModel.map((item)=>{return item.id})
  let userDict = {}
  userDict["ids"] = userIds
  await axios.post(process.env.REACT_APP_API_URL+'delete/user',  userDict )
  .then((response) => {
    if(response.status === 201){
      getAllUsers()
      alert("User delete successfull !")
      return 
    }
  })
  .catch((error) => {
    console.error('Error deleting users:', error);
  });
}

React.useEffect(()=>{
  if (rows.length===0){
      // getAllUsers()
  }
})
console.log("selectionModel ",selectionModel)

  const history = useNavigate(); // Initialize history for navigation

  const handleNavigation = (route) => {
    history(`/${route}`); // Navigate to the specified route
  };
  return (
    <Box className='create-user'>
        {sessionStorage.getItem("role")==='admin'?
      <Box sx={{display:"flex", justifyContent:"right", marginBottom:"0.5rem"}}>
        <Button variant="contained"  onClick={handleDelete} sx={{ color: '#fff' , marginRight:"0.5rem"}}>Delete</Button>

        <Button variant="contained"  onClick={() => handleNavigation('create-user')} sx={{ color: '#fff' }}>Create-User</Button>
      </Box>
      :''}
    <div style={{ minHeight:300, height:450, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        sortModel={sortModel}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        checkboxSelection
        getRowId={(row)=>row.id}
        onRowSelectionModelChange={(ids) => {handleSelection(ids)}}

      />
    </div>
    </Box>
  );
}
