import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Types ==============================================
type Filter = { title: string; key: string };

export interface PreferenceState {
  sources: Filter[];
  categories: Filter[];
  countries: Filter[];
  languages: Filter[];
  sortBy: Filter[];
  loading: boolean;
  error: string | undefined;
  saved: boolean;
  preferences: any;
}

// Initial State ==============================================
const initialState: PreferenceState = {
  sources: [],
  categories: [],
  languages: [],
  countries: [],
  sortBy: [],
  loading: false,
  error: undefined,
  preferences: undefined,
  saved: false,
};

// SAVE PREFERENCES
export const savePreferences = createAsyncThunk(
  "preference/savePreferences",
  async (preferences: any) => {
    try {
      console.log("preferences: ", preferences);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/preference`,
        { ...preferences },
        { withCredentials: true }
      );

      console.log("response: ", response);
      return response.data;
    } catch (error: any) {
      console.log(error.response.data.message);
      throw new Error(error.response.data.message);
    }
  }
);

// GET PREFERENCES
export const getPreferences = createAsyncThunk(
  "preference/getPreferences",
  async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/preference`,
        { withCredentials: true }
      );

      console.log("response: ", response);
      return response.data;
    } catch (error: any) {
      console.log(error.response.data.message);
      throw new Error(error.response.data.message);
    }
  }
);

// FILL THE PREFERENCES FROM API RESPONSE
const fillPreferences = (state: any, preferences: any) => {
  state.sources = JSON.parse(preferences.sources);
  state.categories = JSON.parse(preferences.categories);
  state.countries = JSON.parse(preferences.countries);
  state.languages = JSON.parse(preferences.languages);
  state.sortBy = JSON.parse(preferences.sortBy);
};

// Slice ==============================================
const preferenceSlice = createSlice({
  name: "preference",
  initialState,
  reducers: {
    addSource: (state, action) => {
      state.sources = action.payload;
    },
    removeSource: (state, action) => {
      state.sources = action.payload;
    },
    addCategory: (state, action) => {
      state.categories = action.payload;
    },
    removeCategory: (state, action) => {
      state.categories = action.payload;
    },
    addCountry: (state, action) => {
      state.countries = action.payload;
    },
    removeCountry: (state, action) => {
      state.countries = action.payload;
    },
    addLanguage: (state, action) => {
      state.languages = action.payload;
    },
    removeLanguage: (state, action) => {
      state.languages = action.payload;
    },
    addSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    removeSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
  },
  extraReducers: builder => {
    // SAVE PREFERENCES
    builder.addCase(savePreferences.pending, (state, action) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(savePreferences.fulfilled, (state, action) => {
      state.loading = false;
      state.saved = true;
      state.preferences = action.payload;
      state.error = undefined;
    });
    builder.addCase(savePreferences.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // GET PREFERENCES
    builder.addCase(getPreferences.pending, (state, action) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(getPreferences.fulfilled, (state, action) => {
      state.loading = false;
      fillPreferences(state, action.payload);
      state.error = undefined;
    });
    builder.addCase(getPreferences.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

// Exports ==============================================
export const {
  addSource,
  removeSource,
  addCategory,
  removeCategory,
  addCountry,
  removeCountry,
  addLanguage,
  removeLanguage,
  addSortBy,
  removeSortBy,
} = preferenceSlice.actions;

export default preferenceSlice.reducer;
