
import { BrowserRouter , Route, Switch, Routes } from 'react-router-dom';

import Dashboard from "./dashboard";
import HomePage from './view';
import { Box } from '@mui/material';

function App() {
  return (
    <BrowserRouter>
    <Box className="app">
      <Dashboard />
    </Box>
    </BrowserRouter>
  );
}

export default App;
