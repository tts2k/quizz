import { createContext, useContext, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';

const SnackbarContext = createContext({});

const SnackTypes = {
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
  SUCCESS: 'success'
}

const SnackbarProvider = ({ children }) => {
  const initialState = {
    message: '',
    type: SnackTypes.INFO,
    isOpen: false
  } 
  const [snack, setSnack] = useState(initialState);

  const showSnack = (type, message) => {
    setSnack({ message: message, type: type, isOpen: true })
  };

  const handleClose = () => {
    setSnack(initialState);
  }

  return (
    <SnackbarContext.Provider value={{ showSnack }}>
      <Snackbar
        open={snack.isOpen}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={snack.type}>
          {snack.message}
        </Alert>
      </Snackbar>
      {children}
    </SnackbarContext.Provider>
  )
}

const useSnackbar = () => {
  const context = useContext(SnackbarContext);

  if (!context) {
    throw new Error('useSnackBar must be used within a SnackbarProvider');
  }

  return context;
};

export { SnackbarProvider, useSnackbar, SnackTypes }
