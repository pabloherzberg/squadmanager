import { LoginStatusEnum, UserInterface } from '@/utils/types/user';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import jwt from 'jsonwebtoken';
import api from './api';

type CredentialsProps = {
  Email: string;
  Password: string;
  Role?: string;
  Username?: string;
};

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: CredentialsProps) => {
    const response = await api.post('/users/login', credentials);
    const token = response.data.token;
    const decodedToken = jwt.decode(token) as UserInterface;

    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
    return { user: decodedToken ?? null, token: token };
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (credentials: CredentialsProps) => {
    const response = await api.post('/users/register', credentials);
    return response.data ?? null;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: undefined as UserInterface | undefined,
    status: LoginStatusEnum.idle,
    error: null as string | null | undefined,
    token: undefined,
  },
  reducers: {
    logout: (state) => {
      state.user = undefined;
      state.token = undefined;
      state.status = LoginStatusEnum.idle;
      state.error = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
      }
    },
    loadUserFromToken: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.status = LoginStatusEnum.succeeded;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = LoginStatusEnum.loading;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = LoginStatusEnum.succeeded;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = LoginStatusEnum.failed;
        state.error = action.error.message;
      })
      .addCase(register.pending, (state) => {
        state.status = LoginStatusEnum.loading;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = LoginStatusEnum.succeeded;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = LoginStatusEnum.failed;
        state.error = action.error.message;
      });
  },
});

export const { logout, loadUserFromToken } = authSlice.actions;
export default authSlice.reducer;
