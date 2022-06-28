import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification: (state, action) => action.payload,
    clearNotification: (state, action) => null,
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;

let notificationTimerId = null;
export const set3sNotification = (message) => (dispatch) => {
  clearTimeout(notificationTimerId);

  dispatch(setNotification(message));

  const timerId = setTimeout(() => {
    notificationTimerId = null;
    dispatch(clearNotification());
  }, 3000);
  notificationTimerId = timerId;
};

export default notificationSlice.reducer;
