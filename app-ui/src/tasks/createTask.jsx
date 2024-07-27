import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { format } from 'date-fns';

const CreateTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assign, setAssign] = useState('');
  const [users, setUsers] = useState('');

  const [priority, setPriority] = useState('Low');
  const today = new Date(); // Get today's date
  const formattedToday = format(today, 'yyyy-MM-dd');
  const [dueDate, setDueDate] = useState(formattedToday)

  const navigate = useNavigate();

  // const handleCreateTask = () => {
  //   // Add logic to create task here
  // };

  const getAllUser = async () =>{
    const res =await axios.get(process.env.REACT_APP_API_URL+"user/all")
      if(res.status === 200){
        setUsers(res.data)
      }
  }

// const assignItem = 


  const handleCreateTask = async () => {
    if (!title || !description || !priority || !dueDate ||!assign) {
      alert('Please provide title, description, priority, and due date');
      return 
    }
  
    const taskData = {
      title: title,
      description: description,
      priority: priority,
      dueDate: dueDate,
      createdBy:sessionStorage.getItem("email"),
      userEmail:assign,
    };
  
    try {
      const response = await axios.post(process.env.REACT_APP_API_URL+"task/create", taskData);
      if(response.status === 201){
        alert("Task created !")
      navigate('/tasks',{replace:true})
        return 
      }

      // Add any additional logic upon successful task creation
      // return response.data; // If you want to return the created task data
    } catch (error) {
      console.error('Error creating task', error);
      // Add error handling logic here
      throw error; // Throw the error if you want to handle it outside of this function
    }
  };
  


  const handleGoBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  useEffect(()=>{
    if (users.length === 0){
      getAllUser()
    }
  })

  return (
    <div>
    <Button
    variant="text"
    startIcon={<ArrowBackIcon />}
    onClick={handleGoBack}
  >
    Back
  </Button>
    <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px', margin: 'auto' }}>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        label="Description"
        multiline
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

        <FormControl>
        <InputLabel id="priority-label">Assign To</InputLabel>
        <Select
          labelId="priority-label"
          id="Priority"
          label="Assign To"
          value={assign}
          onChange={(e) => setAssign(e.target.value)}
        >
          {users && users.map((item)=>{return <MenuItem value={item.email}>{item.email}</MenuItem>
          })}
          {/* <MenuItem value="Low">Low</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="High">High</MenuItem> */}
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel id="priority-label">Priority</InputLabel>
        <Select
          labelId="priority-label"
          id="Priority"
          label="Priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <MenuItem value="Low">Low</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="High">High</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Due Date"
        type="date"
        defaultValue={formattedToday} // Set default value to today's date
        InputLabelProps={{
          shrink: true,
        }}
        value={dueDate}
        onChange={(e)=>setDueDate(e.target.value)}
        inputProps={{
          min: formattedToday, // Prevent selecting a date before today
        }}
      />
      <Button
        variant="contained"
        startIcon={<AddCircleOutlineIcon />}
        onClick={handleCreateTask}
      >
        Create
      </Button>
    </form>
    </div>
  );
};

export default CreateTask;
