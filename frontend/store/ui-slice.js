import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isfirstTime: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setFirstTime(state, action) {
      state.isfirstTime = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
