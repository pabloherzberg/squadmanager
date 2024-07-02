import { LoginStatusEnum } from '@/utils/types/user';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from './api';

const initialState = {
  employees: [],
  status: LoginStatusEnum.idle,
  error: null as string | null | undefined,
};

export const fetchEmployees = createAsyncThunk(
  'employee/fetchEmployees',
  async () => {
    const response = await api.get('/users');
    return response.data;
  }
);

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.status = LoginStatusEnum.loading;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.status = LoginStatusEnum.succeeded;
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.status = LoginStatusEnum.failed;
        state.error = action.error.message;
      });
  },
});

export default employeeSlice.reducer;
