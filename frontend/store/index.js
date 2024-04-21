import { configureStore } from '@reduxjs/toolkit';
import uiSlice from './ui-slice';
import profileSlice from './profile-slice';

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    profile: profileSlice.reducer,
  },
});

export default store;
