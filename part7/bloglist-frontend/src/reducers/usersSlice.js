import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as usersService from '../services/users';

export const getUsers = createAsyncThunk('users/getUsers', async () => {
  const users = await usersService.getUsers();
  return users;
});

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action) => action.payload);
  },
});

export default usersSlice.reducer;
