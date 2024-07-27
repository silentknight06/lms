import React from 'react';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';

import Navbar from './layout/navbar.jsx';
import Task from "./tasks/index";
import User from "./users/index";
import CreateUser from './users/createUser.jsx';
import CreateAdminUser from './users/createAdmin.jsx';

import CreateTask from './tasks/createTask.jsx';
import LoginPage from './users/login.jsx';
import EditTask from './tasks/editTask.jsx';
import HomePage from './view/index.js'
import AdminLoginPage from './users/adminLogin.jsx'
import AddBook from './users/addBook.jsx';
import AssignBook from './users/assignBook.jsx';
import History from './users/history.jsx'
import UserHistory from './users/userHistory.jsx'
import AdminDashboard from './users/adminDashboard.jsx';
import ChangeBookStatus from './users/changeStatus.jsx';

function Dashboard() {
  const navigate = useNavigate();

  const username = sessionStorage.getItem('username');
  const role = sessionStorage.getItem('role');

  // if (!username) {
  //   return <HomePage />;
  // }

  const isAdmin = role === 'admin';

  // if (!isAdmin && window.location.pathname.startsWith('/admin')) {
  //   navigate('/');
  //   return null;
  // }

  return (
    <Box className="content">
        <Navbar />
        <main className='main'>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/user" element={<User />} />
            <Route path='/admin' element={<AdminLoginPage />} />
            <Route path='/userhistory' element={<UserHistory />} />
            {sessionStorage.getItem("role")==='admin'? (
            <>
            <Route path ='admin/create-user' element={<CreateUser />} />
            <Route path ='admin/create-Admin' element={<CreateAdminUser />} />
            <Route path='/admin/addBook' element={<AddBook />} />
            <Route path='/admin/assign' element={<AssignBook />} />
            <Route path='/admin/history' element={<History />} />
            <Route path='/admin/dashboard' element={<AdminDashboard />} />
            <Route path='/admin/bookStatus' element={<ChangeBookStatus />} />

            </>)
            : ( <Route path='/admin/*' element={<Navigate to='/admin' replace />} />
            )}

          </Routes>
        </main>
    </Box>
  );
}

export default Dashboard;
