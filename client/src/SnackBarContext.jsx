import { createContext, useContext } from 'react';
import { Snackbar } from '@mui/material';

const SnackbarContext = createContext({});

const SnackTypes = {
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
  SUCCESS: 'success'
}

const SnackbarProvider = ({ children }) => {
  const [snack, setSnack] = useState({
    message: '',
    type: '',
    isOpen: false
  })

  const showSnack = (type, message) => {
    setSnack({
      message: message,
      type: type,
      isOpen: true
    })
  };

  const handleClose = () => {
    setOpen(false);
    setType(SnackTypes.INFO);
  }

  return (
    <SnackbarContext.Provider value={{ showSnack }}>
      <Snackbar
        open={snack.isOpen}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={typeColor}>
          {message}
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
