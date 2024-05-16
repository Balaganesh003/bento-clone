import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isfirstTime: false,
  isSameUser: true,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setFirstTime(state, action) {
      state.isfirstTime = action.payload;
    },
    setSameUser(state, action) {
      state.isSameUser = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
