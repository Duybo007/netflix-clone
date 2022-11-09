import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    movies: []
  },
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    login : (state, action) => {
      state.user = action.payload
    },
    logout: (state) => {
      state.user = null
    },
    searchMovies: (state, action) => {
      state.movies = action.payload
    }
  },
});

export const { login, logout, searchMovies } = userSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUser = (state) => state.user.user;
export const selectMovie = (state) => state.user.movies

export default userSlice.reducer;
