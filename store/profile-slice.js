import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isfirstTime: true,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setFirstTime(state, action) {
      state.isfirstTime = action.payload;
    },
  },
});

export const profileActions = profileSlice.actions;

export default profileSlice;
