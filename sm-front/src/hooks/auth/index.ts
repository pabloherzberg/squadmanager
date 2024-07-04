import api from '@/hooks/api';
import {
  setAuthError,
  setAuthStatus,
  setToken,
  setUser,
} from '@/store/authSlice';
import { useAppDispatch } from '@/store/useRedux';
import { QueryStatusEnum, UserInterface } from '@/utils/types/index';
import jwt from 'jsonwebtoken';
import { useMutation } from 'react-query';

export const useFetchAuth = () => {
  const dispatch = useAppDispatch();

  return useMutation(
    async (credentials: { Email: string; Password: string }) => {
      const response = await api.post('/users/login', credentials);
      const token = response.data.token;
      const decodedToken = jwt.decode(token) as UserInterface;

      if (typeof window !== 'undefined') {
        localStorage.setItem('token', token);
      }

      return { user: decodedToken, token };
    },
    {
      onMutate: () => {
        dispatch(setAuthStatus(QueryStatusEnum.loading));
      },
      onSuccess: (data) => {
        dispatch(setUser(data.user));
        dispatch(setToken(data.token));
        dispatch(setAuthStatus(QueryStatusEnum.succeeded));
      },
      onError: (error: any) => {
        dispatch(setAuthError(error.message));
        dispatch(setAuthStatus(QueryStatusEnum.failed));
      },
    }
  );
};

export const useCreateUser = () => {
  const dispatch = useAppDispatch();

  return useMutation(
    async (user: {
      Username: string;
      Email: string;
      Password: string;
      Role: string;
    }) => {
      const response = await api.post('/users/register', user);
      return response.data;
    },
    {
      onMutate: () => {
        dispatch(setAuthStatus(QueryStatusEnum.loading));
      },
      onSuccess: () => {
        dispatch(setAuthStatus(QueryStatusEnum.succeeded));
      },
      onError: (error: any) => {
        dispatch(setAuthError(error.message));
        dispatch(setAuthStatus(QueryStatusEnum.failed));
      },
    }
  );
};
