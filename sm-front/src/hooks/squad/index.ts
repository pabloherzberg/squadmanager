import api from '@/hooks/api';
import { setUsers } from '@/store/authSlice';
import {
  addSquad,
  deleteSquad,
  setError,
  setSquad,
  setSquads,
  setStatus,
  updateSquad,
} from '@/store/squadSlice';
import { useAppDispatch } from '@/store/useRedux';
import { LoginStatusEnum, Squad } from '@/utils/types/index';
import { useMutation, useQuery, useQueryClient } from 'react-query';

export const useFetchSquads = () => {
  const dispatch = useAppDispatch();
  return useQuery('squads', async () => {
    dispatch(setStatus(LoginStatusEnum.loading));
    try {
      const response = await api.get('/squad');
      dispatch(setSquads(response.data));
      dispatch(setStatus(LoginStatusEnum.succeeded));
      return response.data;
    } catch (error: any) {
      dispatch(setError(error.message));
      dispatch(setStatus(LoginStatusEnum.failed));
      throw error;
    }
  });
};

export const useCreateSquad = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return useMutation(
    async (newSquad: { name: string; description: string }) => {
      const response = await api.post('/squad/create', newSquad);
      return response.data;
    },
    {
      onSuccess: (data) => {
        dispatch(addSquad(data));
        queryClient.invalidateQueries('squads');
      },
    }
  );
};

export const useUpdateSquad = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return useMutation(
    async (updatedSquad: Squad) => {
      const response = await api.put(`/squad/${updatedSquad.squadid}`, {
        squadId: updatedSquad.squadid,
        name: updatedSquad.name,
        description: updatedSquad.description,
      });
      return response.data;
    },
    {
      onSuccess: (data) => {
        dispatch(updateSquad(data));
        queryClient.invalidateQueries('squads');
        dispatch(setStatus(LoginStatusEnum.succeeded));
      },
      onError: (error: any) => {
        dispatch(setError(error.message));
        dispatch(setStatus(LoginStatusEnum.failed));
      },
    }
  );
};
export const useDeleteSquad = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return useMutation(
    async (id: number) => {
      await api.delete(`/squad/${id}`);
      return id;
    },
    {
      onSuccess: (id) => {
        dispatch(deleteSquad(id));
        queryClient.invalidateQueries('squads');
      },
    }
  );
};

export const useGetSquad = (id: string) => {
  const dispatch = useAppDispatch();
  return useQuery(['squad', id], async () => {
    dispatch(setStatus(LoginStatusEnum.loading));
    try {
      const response = await api.get(`/squad/${id}`);
      const data = {
        squad: response.data.squad,
        squadMembers: response.data.squadMembers,
        users: response.data.users,
      };
      dispatch(setSquad(data));
      dispatch(setStatus(LoginStatusEnum.succeeded));
      return data;
    } catch (error: any) {
      dispatch(setError(error.message));
      dispatch(setStatus(LoginStatusEnum.failed));
      throw error;
    }
  });
};

export const useDeleteSquadMember = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return useMutation(
    async ({ squadId, memberId }: { squadId: number; memberId: number }) => {
      const response = await api.delete(`/squad/members/remove`, {
        data: { squadId, memberId },
      });
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        const { squadId } = variables;
        queryClient.invalidateQueries(['squad', squadId]);
        dispatch(updateSquad(data));
        dispatch(setStatus(LoginStatusEnum.succeeded));
      },
      onError: (error: any) => {
        dispatch(setError(error.message));
        dispatch(setStatus(LoginStatusEnum.failed));
      },
    }
  );
};

export const useAddSquadMember = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return useMutation(
    async ({ squadId, userId }: { squadId: number; userId: number }) => {
      const response = await api.post(`/squad/members/add`, {
        squadId,
        userId,
      });
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        const { squadId } = variables;
        queryClient.invalidateQueries(['squad', squadId]);
        dispatch(updateSquad(data));
        dispatch(setStatus(LoginStatusEnum.succeeded));
      },
      onError: (error: any) => {
        dispatch(setError(error.message));
        dispatch(setStatus(LoginStatusEnum.failed));
      },
    }
  );
};
export const useFetchUsers = () => {
  const dispatch = useAppDispatch();
  return useQuery('users', async () => {
    dispatch(setStatus(LoginStatusEnum.loading));
    try {
      const response = await api.get('/users');
      dispatch(setUsers(response.data));
      dispatch(setStatus(LoginStatusEnum.succeeded));
      return response.data;
    } catch (error: any) {
      dispatch(setError(error.message));
      dispatch(setStatus(LoginStatusEnum.failed));
      throw error;
    }
  });
};
