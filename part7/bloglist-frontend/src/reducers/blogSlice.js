import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as blogService from '../services/blogs';

export const getBlogPosts = createAsyncThunk('blog/getBlogPosts', async () => {
  const blogs = await blogService.getAll();
  return blogs.sort((a, b) => b.likes - a.likes);
});

export const createBlogPost = createAsyncThunk(
  'blog/createBlogPost',
  async ({ title, author, url, user }) => {
    const newBlog = await blogService.create({ title, author, url });
    return { ...newBlog, user };
  }
);

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBlogPosts.fulfilled, (state, action) => action.payload);
    builder.addCase(createBlogPost.fulfilled, (state, action) =>
      state.concat(action.payload)
    );
  },
});

export default blogSlice.reducer;
