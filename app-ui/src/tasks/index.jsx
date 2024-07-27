import * as React from 'react';
import  {DataGrid}  from '@mui/x-data-grid';
import { Box, Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate to handle navigation


// const columns = [
//   { field: 'id', headerName: 'ID', width: 90 },
//   { field: 'username', headerName: 'Username', width: 150 },
//   { field: 'email', headerName: 'Email', width: 200 },
//   { field: 'createdAt', headerName: 'Created At', width: 160 },
//   { field: 'createdBy', headerName: 'Created By', width: 160 },
//   { field: 'role', headerName: 'Role', width: 120 },
// ];
const columns = [
  // { field: 'id', headerName: 'ID', width: 100 },
  { field: 'title', headerName: 'Title', width: 100 },
  { field: 'description', headerName: 'Description', width: 200 },
  { field: 'priority', headerName: 'Priority', width: 100 },
  { field: 'createdDate', headerName: 'Created AT', width: 200 },
  { field: 'userEmail', headerName: 'Assigned To', width: 150 },
  { field: 'completion', headerName: 'Status', width: 200 ,
  renderCell: (params) => (
        <div>{params.row.completion===false ? 'In Progress' : 'Completed'}</div>
  )},

  { field: 'dueDate', headerName: 'Due Date', width: 150 },
  { field: 'updatedBy', headerName: 'Completed By', width: 150 },
  {
    field: 'edit',
    headerName: 'Action',
    width: 100,
    renderCell: (params) => (
        <Link to={`edit/${params.id}`}>
          {sessionStorage.getItem('role')==='admin'?
        <IconButton aria-label="edit">
          <EditIcon />
        </IconButton>
        :''}
      </Link>
    ),
  },

  // Add more columns as needed
];

export default function Task() {

  const history = useNavigate(); // Initialize history for navigation
  const [rows, setRows] = React.useState([])
  const [sortModel, setSortModel] = React.useState([
    {
      field: 'createdDate',
      sort: 'desc', // 'asc' for ascending, 'desc' for descending
    },
  ]);
  const [selectionModel, setSelectionModel] = React.useState([])
  const handleNavigation = (route) => {
    history(`/${route}`,{replace:true}); // Navigate to the specified route
  };


  const getAllTask =async () =>{

    try {
      if(sessionStorage.getItem('role')==='admin'){
        const res =await axios.get(process.env.REACT_APP_API_URL+"task/all")
        if(res.status === 200){
          
          setRows(res.data)
        }
      }
      else{
        const res =await axios.get(process.env.REACT_APP_API_URL+"task/by/"+sessionStorage.getItem("email"))
      if(res.status === 200){
        console.log("resdata", res.data)
        if(res.data.length === 0){
          alert("No task exists for this user !")
          return 
        }
        else{
          setRows(res.data)

        }
      }
      }
      // Add any additional logic upon successful task creation
      // return response.data; // If you want to return the created task data
    } catch (error) {
      console.error('Error creating task', error);
      // Add error handling logic here
      return 
      throw error; // Throw the error if you want to handle it outside of this function
    }
    
  }
  const handleSelection = (ids) =>{
    const selectedIDs = new Set(ids);
    const selectedRows = rows.filter((row: any) =>
      selectedIDs.has(row.id)
    );
    setSelectionModel(selectedRows);
  }

  React.useEffect(()=>{
    if (rows.length === 0){
      getAllTask()
    }
  })

  // console.log("rows ", rows)
  console.log("selection model ", selectionModel)
  const handleComplete =async () =>{
    if (selectionModel.length === 0){
      alert("Task not selected !")
      return 
    }
    let userIds = selectionModel.map((item)=>{return item.id})
    let userDict = {}
    userDict["ids"] = userIds
    userDict["updatedBy"] = sessionStorage.getItem('email')
    console.log("userIds ", userIds)
    await axios.post(process.env.REACT_APP_API_URL+'task/status',  userDict )
    .then((response) => {
      if(response.status === 201){
        getAllTask()
        alert("Status Updated Successfull !")
        return 
      }
    })
    .catch((error) => {
      console.error('Error deleting users:', error);
    });
  }


  return (
    <Box>
      <Box sx={{display:"flex", justifyContent:"right", marginBottom:"0.5rem"}}>
      <Button variant="contained"  onClick={handleComplete} sx={{ color: '#fff' , marginRight:"0.5rem"}}>Mark task completed</Button>
      {sessionStorage.getItem('role') === 'admin'?

        <Button variant="contained"  onClick={() => handleNavigation('create-task')} sx={{ color: '#fff' }}>Create-Task</Button>
        :''}

        </Box>
    <div style={{ minHeight:300, height:450, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        sortModel={sortModel}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        checkboxSelection
        getRowId={(row) => row.id} 
        onRowSelectionModelChange={(ids) => {handleSelection(ids)}}


      />
    </div>
    </Box>

  );
}
