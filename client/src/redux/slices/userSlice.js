import { createSlice } from "@reduxjs/toolkit";

const initState = {
  user: {},
  isAuth: false
}

const userSlice = createSlice({
  name: 'user',
  initialState: initState,
  reducers: {
    setUser: ( state, action ) => {
      state.user = action.payload
      state.isAuth = true;
    }
  }
})

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
