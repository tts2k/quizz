import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/api";
import axios from "../../config/axios";
  
export const getAllQuestions = createAsyncThunk(
  'question/getAllQuestions',
  async ({ page, searchKeyword }, thunkAPI) => {
    const params = {
      page: (page) ? page : 1,
    }

    if (searchKeyword && searchKeyword !== '') {
      params.keyword = searchKeyword;
    }
    console.log('params:', params)

    try {
      const res = await axios.get(api.question, {
        params: {
          ...params
        },
      })

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
)
