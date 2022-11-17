import { createSlice } from "@reduxjs/toolkit";
import { getAllQuestions } from "./questionAction";

const initState = {
  loading: false,
  questions: [],
  count: 0,
  token: {
    refreshToken: null,
    accessToken: null
  },
  error: null,
  success: false,
}

const questionSlice = createSlice({
  name: 'question',
  initialState: initState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllQuestions.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllQuestions.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload
      })
      .addCase(getAllQuestions.fulfilled, (state, action) => {
        state.error = null;
        state.success = true;
        state.questions = action.payload.data.rows;
        state.count = action.payload.data.count;
        console.log(action.payload);
      })
  }
})

export const { setPage } =  questionSlice.actions;
export default questionSlice.reducer;
