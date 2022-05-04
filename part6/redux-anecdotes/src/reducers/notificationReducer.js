import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    clearNotification(state, action) {
      return null;
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;

let timerId;
export const setTimedNotification = (message, s) => (dispatch) => {
  clearTimeout(timerId);
  dispatch(setNotification(message));
  timerId = setTimeout(() => {
    dispatch(clearNotification());
  }, s * 1000);
};

export default notificationSlice.reducer;
