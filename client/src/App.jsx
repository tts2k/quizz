import './App.css';
import { Box } from '@mui/material';
import NavBar from './components/NavBar/NavBar';
import router from './router/router';
import { RouterProvider } from 'react-router-dom';
import Snack from './components/Snack/Snack'; 

export default function App() {
  return (
    <>
      <NavBar />
      <Box style={{ marginTop: "130px" }}></Box>
      <RouterProvider router={router}/>
      <Snack />
    </>
  )
}
