import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './authSlice';
import employeeReducer from './employeeSlice';
import squadReducer from './squadSlice';
import taskReducer from './taskSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedEmployeeReducer = persistReducer(persistConfig, employeeReducer);
const persistedSquadReducer = persistReducer(persistConfig, squadReducer);
const persistedTaskReducer = persistReducer(persistConfig, taskReducer);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    squad: persistedSquadReducer,
    employee: persistedEmployeeReducer,
    task: persistedTaskReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
