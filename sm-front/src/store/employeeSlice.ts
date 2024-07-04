import { QueryStatusEnum } from '@/utils/types/index';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../hooks/api';

const initialState = {
  employees: [],
  status: QueryStatusEnum.idle,
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
        state.status = QueryStatusEnum.loading;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.status = QueryStatusEnum.succeeded;
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.status = QueryStatusEnum.failed;
        state.error = action.error.message;
      });
  },
});

export default employeeSlice.reducer;
