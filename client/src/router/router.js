import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home'
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import AnswerQuestion from '../pages/AnswerQuestion';
import ProtectedRoute from '../router/ProtectedRoute';

export default createBrowserRouter([
  {
    path: "/",
    element: <Home /> ,
  },
  {
    path: "login",
    element: <Login />
  },
  {
    path: "answer",
    element: (
      <ProtectedRoute>
        <AnswerQuestion />
      </ProtectedRoute>
    )
  },
  {
    path: "register",
    element: <Register />
  },
])
