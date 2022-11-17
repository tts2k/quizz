import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user/userSlice";
import questionSlice from "./features/question/questionSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    question: questionSlice
  }
})

export default store;
