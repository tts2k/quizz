import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import AnswerQuestion from './pages/AnswerQuestion'
import NavBar from './components/NavBar/NavBar';
import { SnackbarProvider } from './context/SnackBarContext';

export default function App() {
  return (
    <SnackbarProvider>
      <NavBar />
      <Box style={{ marginTop: "130px" }}></Box>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/answer" element={<AnswerQuestion />}/>
      </Routes>
    </SnackbarProvider>
  )
}
