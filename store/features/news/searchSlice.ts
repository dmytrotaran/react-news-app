import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Types ==============================================
export interface SearchState {
  query: string;
  news:
    | {
        status: string;
        totalResults: number;
        articles: any[];
      }
    | undefined;
  loading: boolean;
  error: string | undefined;
}

// Initial State ==============================================
const initialState: SearchState = {
  query: "headlines",
  news: undefined,
  loading: false,
  error: undefined,
};

// GET NEWS
export const searchNews = createAsyncThunk(
  "news/searchNews",
  async (search: string) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_NEWS_API_URL}everything?q=${search}&pageSize=10&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`
      );

      return response.data;
    } catch (error: any) {
      console.log(error.response.data.message);
      throw new Error(error.response.data.message);
    }
  }
);

// FILTER NEWS
export const filterNews = createAsyncThunk(
  "news/filterNews",
  async (search: { query: string; filter: string }) => {
    try {
      console.log("filters: ", search.filter);

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_NEWS_API_URL}everything?q=${search.query}&${search.filter}&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`
      );

      return response.data;
    } catch (error: any) {
      console.log(error.response.data.message);
      throw new Error(error.response.data.message);
    }
  }
);

// Slice ==============================================
export const searchSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
  },
  extraReducers: builder => {
    // search
    builder.addCase(searchNews.pending, state => {
      state.loading = true;
      state.error = undefined;
      state.news = undefined;
    });
    builder.addCase(searchNews.fulfilled, (state, action: any) => {
      state.loading = false;
      state.error = undefined;
      state.news = action.payload;
    });
    builder.addCase(searchNews.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.news = undefined;
    });
    // filter
    builder.addCase(filterNews.pending, state => {
      state.loading = true;
      state.error = undefined;
      state.news = undefined;
    });
    builder.addCase(filterNews.fulfilled, (state, action: any) => {
      state.loading = false;
      state.error = undefined;
      state.news = action.payload;
    });
    builder.addCase(filterNews.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.news = undefined;
    });
  },
});

// Actions ==============================================
export const { setQuery } = searchSlice.actions;

// Reducer ==============================================
export default searchSlice.reducer;
