import { createSlice } from "@reduxjs/toolkit";

export const SnackTypes = {
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
  SUCCESS: 'success'
}

const initState = {
  message: '',
  type: SnackTypes.INFO,
  isOpen: false,
}

const snackSlice = createSlice({
  name: 'snack',
  initialState: initState,
  reducers: {
    showSnack: (state, action) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.isOpen = true;
    },
    hideSnack: (state, action) => {
      state.isOpen = false;
    }
  },
})

export const { showSnack, hideSnack } = snackSlice.actions;
export default snackSlice.reducer;
