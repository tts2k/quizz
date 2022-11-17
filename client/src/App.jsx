import './App.css';
import { Box } from '@mui/material';
import NavBar from './components/NavBar/NavBar';
import { SnackbarProvider } from './context/SnackBarContext';
import router from './router/router';
import { RouterProvider } from 'react-router-dom';

export default function App() {
  return (
    <SnackbarProvider>
      <NavBar />
      <Box style={{ marginTop: "130px" }}></Box>
      <RouterProvider router={router}/>
    </SnackbarProvider>
  )
}
