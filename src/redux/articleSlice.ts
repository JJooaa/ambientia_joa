import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface State {
  status: "idle" | "loading" | "succeeded" | "failed";
  value: { title: string; urlToImage: string }[];
  pageNumber: number;
}
const url = (input: string, pageNumber: number) => {
  // const { keyword, page } = data;
  console.log(pageNumber)
  return (
    "https://newsapi.org/v2/everything?" +
    `q=${input}&` +
    "from=2022-05-30&" +
    "sortBy=popularity&" +
    "language=en&" +
    "pageSize=10&" +
    `page=${pageNumber.toString()}&` +
    "apiKey=9d03da22715841ec922796b12b63157b"
  );
};

export const fetchArticles = createAsyncThunk(
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

export const { increment } = articles.actions;
export default articles.reducer;
