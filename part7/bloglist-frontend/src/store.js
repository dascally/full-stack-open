import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './reducers/notificationSlice';
import blogReducer from './reducers/blogSlice';
import userReducer from './reducers/userSlice';
import usersReducer from './reducers/usersSlice';

export default configureStore({
  reducer: {
    notification: notificationReducer,
    blog: blogReducer,
    user: userReducer,
    users: usersReducer,
  },
});
