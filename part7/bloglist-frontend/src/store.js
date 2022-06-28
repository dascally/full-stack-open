import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './reducers/notificationSlice';
import blogReducer from './reducers/blogSlice';

export default configureStore({
  reducer: {
    notification: notificationReducer,
    blog: blogReducer,
  },
});
