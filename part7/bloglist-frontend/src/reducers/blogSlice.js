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

export const likeBlogPost = createAsyncThunk(
  'blog/likeBlogPost',
  async (blog) => {
    const likedBlog = await blogService.like(blog);
    return likedBlog;
  }
);

export const deleteBlogPost = createAsyncThunk(
  'blog/deleteBlogPost',
  async (blogId) => {
    await blogService.remove(blogId);
    return blogId;
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
    builder.addCase(likeBlogPost.fulfilled, (state, action) => {
      const likedBlog = action.payload;
      const newBlogs = state.map((blog) =>
        blog.id === likedBlog.id ? likedBlog : blog
      );
      return newBlogs.sort((a, b) => b.likes - a.likes);
    });
    builder.addCase(deleteBlogPost.fulfilled, (state, action) => {
      const deletedBlogId = action.payload;
      const newBlogs = state.filter((blog) => blog.id !== deletedBlogId);
      return newBlogs;
    });
  },
});

export default blogSlice.reducer;
