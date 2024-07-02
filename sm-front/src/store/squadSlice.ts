import { LoginStatusEnum, SquadsState } from '@/utils/types/user';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from './api';

const initialState: SquadsState = {
  squads: [],
  status: LoginStatusEnum.idle,
  error: null,
};

export const fetchSquads = createAsyncThunk('squad/fetchSquads', async () => {
  const response = await api.get('/squad');
  return response.data;
});

const squadsSlice = createSlice({
  name: 'squads',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSquads.pending, (state) => {
        state.status = LoginStatusEnum.loading;
      })
      .addCase(fetchSquads.fulfilled, (state, action) => {
        state.status = LoginStatusEnum.succeeded;
        state.squads = action.payload;
      })
      .addCase(fetchSquads.rejected, (state, action) => {
        state.status = LoginStatusEnum.failed;
        state.error = action.error.message;
      });
  },
});

export default squadsSlice.reducer;
