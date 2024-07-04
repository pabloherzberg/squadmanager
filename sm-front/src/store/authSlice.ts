import { QueryStatusEnum, UserInterface } from '@/utils/types/index';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type AuthState = {
  users: any[];
  user?: UserInterface;
  status: QueryStatusEnum;
  error?: string | null;
  token?: string;
};

const initialState: AuthState = {
  user: undefined,
  users: [],
  status: QueryStatusEnum.idle,
  error: null,
  token: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = undefined;
      state.token = undefined;
      state.status = QueryStatusEnum.idle;
      state.error = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
      }
    },
    loadUserFromToken(
      state,
      action: PayloadAction<{ user: UserInterface; token: string }>
    ) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.status = QueryStatusEnum.succeeded;
    },
    setAuthStatus(state, action: PayloadAction<QueryStatusEnum>) {
      state.status = action.payload;
    },
    setAuthError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setUser(state, action: PayloadAction<UserInterface>) {
      state.user = action.payload;
    },
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    setUsers(state, action: PayloadAction<any[]>) {
      state.users = action.payload;
    },
  },
});

export const {
  logout,
  loadUserFromToken,
  setAuthStatus,
  setAuthError,
  setUser,
  setUsers,
  setToken,
} = authSlice.actions;
export default authSlice.reducer;
