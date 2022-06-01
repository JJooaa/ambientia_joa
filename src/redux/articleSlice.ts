import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface State {
  status: "idle" | "loading" | "succeeded" | "failed";
  value: { title: string; urlToImage: string }[] | any;
  pageNumber: number;
}
const url = (input: string, pageNumber: number) => {
  return (
    "https://newsapi.org/v2/everything?" +
    `q=${input}&` +
    "from=2022-05-30&" +
    "sortBy=popularity&" +
    "language=en&" +
    "pageSize=10&" +
    `page=${pageNumber.toString()}&` +
    `apiKey=${import.meta.env.VITE_REACT_API_KEY}`
  );
};

export const fetchArticles = createAsyncThunk<string, string, { state: any }>(
  "/articles/fetchArticles",
  async (input: string, { getState }) => {
    const { pageNumber } = getState().articles;
    const response = await axios.get(url(input, pageNumber));
    return response.data.articles;
  }
);

const initialState = {
  value: [],
  status: "idle",
  pageNumber: 1,
} as State;

export const articles = createSlice({
  name: "articles",
  initialState,
  reducers: {
    increment: (state) => {
      state.pageNumber += 1;
    },
    decrement: (state) => {
      state.pageNumber -= 1;
    },
    reset: (state) => {
      state.pageNumber = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.value = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchArticles.rejected, (state) => {
        state.value = [];
        state.status = "failed";
      });
  },
});

export const { increment, decrement, reset } = articles.actions;
export default articles.reducer;
