import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as blogService from '../services/blogs';
import * as loginService from '../services/login';

export const login = createAsyncThunk(
  'user/login',
  async ({ username, password }, thunkAPI) => {
    const user = await loginService.login(username, password);
    thunkAPI.dispatch(setUser(user));
    return user;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser: (state, action) => {
      const user = action.payload;
      blogService.setToken(user ? user.token : null);
      return user;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
