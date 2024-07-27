import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { format } from 'date-fns';

const EditTask = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assign, setAssign] = useState('');
  const [users, setUsers] = useState('');
  const [priority, setPriority] = useState('Low');
  const today = new Date(); // Get today's date
  const formattedToday = format(today, 'yyyy-MM-dd');
  const [dueDate, setDueDate] = useState(formattedToday);
  const navigate = useNavigate();

  const getTaskData = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_API_URL + `task/${id}`);
      const taskData = response.data; // Assuming response.data contains the task details
      setTitle(taskData.title);
      setDescription(taskData.description);
      setAssign(taskData.userEmail); // Assuming the assignee data is present in taskData
      setPriority(taskData.priority);
      setDueDate(taskData.dueDate);
    } catch (error) {
      console.error('Error fetching task data', error);
      // Handle error fetching task data
    }
  };

  const getAllUsers = async () => {
    try {
      const res = await axios.get(process.env.REACT_APP_API_URL + 'user/all');
      if (res.status === 200) {
        setUsers(res.data);
      }
    } catch (error) {
      console.error('Error fetching users', error);
      // Handle error fetching users
    }
  };


  const handleUpdateTask = async () => {
    if (!title || !description || !priority || !dueDate ||!assign) {
      alert('Please provide title, description, priority, and due date');
      return 
    }
  
    const taskData = {
      id:id,
      title: title,
      description: description,
      priority: priority,
      dueDate: dueDate,
      userEmail:assign,
    };
  
    try {
      const response = await axios.post(process.env.REACT_APP_API_URL+"task/update", taskData);
      if(response.status === 201){
        alert("Task updated !")
      navigate('/tasks',{replace:true})
        return 
      }
    } catch (error) {
      console.error('Error creating task', error);
      return 
      // Add error handling logic here
      throw error; // Throw the error if you want to handle it outside of this function
    }
  };
  

  const handleGoBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  useEffect(() => {
    if (!users.length) {
      getAllUsers();
    }
    if (id) {
      getTaskData();
    }
  }, [id, users]);

  return (
    <div>
      {users.length !==0 ?<>
      <Button variant="text" startIcon={<ArrowBackIcon />} onClick={handleGoBack}>
        Back
      </Button>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px', margin: 'auto' }}>
        <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <TextField label="Description" multiline rows={4} value={description} onChange={(e) => setDescription(e.target.value)} />
        <FormControl>
          <InputLabel id="assign-label">Assign To</InputLabel>
          <Select labelId="assign-label" id="assignTo" label="Assign To" value={assign} onChange={(e) => setAssign(e.target.value)}>
            {users && users.map((item) => <MenuItem key={item.id} value={item.email}>{item.email}</MenuItem>)}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="priority-label">Priority</InputLabel>
          <Select labelId="priority-label" id="priority" label="Priority" value={priority} onChange={(e) => setPriority(e.target.value)}>
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="High">High</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Due Date"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            min: formattedToday, // Prevent selecting a date before today
          }}
        />
        <Button variant="contained" startIcon={<AddCircleOutlineIcon />} onClick={handleUpdateTask}>
          Update
        </Button>
      </form >
      </>
      :''}
      </div>
  )
      }

      export default EditTask;