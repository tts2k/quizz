import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { hideSnack } from '../../features/snack/snackSlice';
import { Snackbar, Alert } from '@mui/material';

export default function Snack() {
  const snack = useSelector(state => state.snack)
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(hideSnack());
  }

  return (
    <Snackbar
      open={snack.isOpen}
      autoHideDuration={5000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={snack.type}>
        {snack.message}
      </Alert>
    </Snackbar>
  )
} 
