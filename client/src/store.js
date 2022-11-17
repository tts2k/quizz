import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user/userSlice";
import questionSlice from "./features/question/questionSlice";
import snackSlice from "./features/snack/snackSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    question: questionSlice,
    snack: snackSlice
  }
})

export default store;
