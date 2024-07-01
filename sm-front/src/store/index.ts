import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import employeeReducer from './employeeSlice';
import squadReducer from './squadSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    squad: squadReducer,
    employee: employeeReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
