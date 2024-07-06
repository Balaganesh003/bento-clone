import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isfirstTime: false,
  isSameUser: false,
  isSuggestionsOpen: false,
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
    setSuggestionsOpen(state, action) {
      state.isSuggestionsOpen = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
