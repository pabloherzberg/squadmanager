import api from '@/hooks/api';
import {
  addTaskEvidence,
  setTaskEvidence,
  setTasks,
  setTasksError,
  setTasksStatus,
} from '@/store/taskSlice';
import { useAppDispatch, useAppSelector } from '@/store/useRedux';
import { QueryStatusEnum, Task, TaskEvidence } from '@/utils/types/index';
import { useMutation, useQuery, useQueryClient } from 'react-query';

interface UpdateTaskParams {
  id: number;
  data: Partial<Task>;
}

export interface AddEvidenceParams {
  taskId: number;
  evidence: {
    evidencepath?: string;
    description?: string;
    status?: string;
  };
}

export const useUpdateTask = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.task.tasks);
  const queryClient = useQueryClient();

  return useMutation(
    async ({ id, data }: UpdateTaskParams) => {
      const response = await api.put(`/tasks/${id}`, data);
      return response.data as Task;
    },
    {
      onMutate: () => {
        dispatch(setTasksStatus(QueryStatusEnum.loading));
      },
      onSuccess: (updatedTask) => {
        queryClient.invalidateQueries('fetchTasks');
        dispatch(setTasksStatus(QueryStatusEnum.succeeded));
        dispatch(
          setTasks(
            tasks.map((task) =>
              task.taskid === updatedTask.taskid ? updatedTask : task
            )
          )
        );
      },
      onError: (error: any) => {
        dispatch(setTasksError(error.message));
        dispatch(setTasksStatus(QueryStatusEnum.failed));
      },
      onSettled: () => {
        dispatch(setTasksStatus(QueryStatusEnum.idle));
      },
    }
  );
};

export const useFetchTasks = () => {
  const dispatch = useAppDispatch();

  return useQuery(
    'fetchTasks',
    async () => {
      const response = await api.get('/tasks');
      return response.data as Task[];
    },
    {
      onSuccess: (data) => {
        dispatch(setTasks(data));
        dispatch(setTasksStatus(QueryStatusEnum.succeeded));
      },
      onError: (error: any) => {
        dispatch(setTasksError(error.message));
        dispatch(setTasksStatus(QueryStatusEnum.failed));
      },
      onSettled: () => {
        dispatch(setTasksStatus(QueryStatusEnum.idle));
      },
    }
  );
};

export const useFetchTaskEvidence = (taskId: number) => {
  const dispatch = useAppDispatch();

  return useQuery(
    ['fetchTaskEvidence', taskId],
    async () => {
      const response = await api.get(`/tasks/${taskId}/evidence`);
      return response.data as TaskEvidence[];
    },
    {
      onSuccess: (data) => {
        dispatch(setTaskEvidence(data));
        dispatch(setTasksStatus(QueryStatusEnum.succeeded));
      },
      onError: (error: any) => {
        dispatch(setTasksError(error.message));
        dispatch(setTasksStatus(QueryStatusEnum.failed));
      },
      onSettled: () => {
        dispatch(setTasksStatus(QueryStatusEnum.idle));
      },
    }
  );
};

export const useAddTaskEvidence = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return useMutation(
    async ({ taskId, evidence }: AddEvidenceParams) => {
      const response = await api.post(`/tasks/${taskId}/evidence`, evidence);
      return response.data as TaskEvidence;
    },
    {
      onMutate: () => {
        dispatch(setTasksStatus(QueryStatusEnum.loading));
      },
      onSuccess: (newEvidence) => {
        queryClient.invalidateQueries([
          'fetchTaskEvidence',
          newEvidence.taskid,
        ]);
        dispatch(addTaskEvidence(newEvidence));
        dispatch(setTasksStatus(QueryStatusEnum.succeeded));
      },
      onError: (error: any) => {
        dispatch(setTasksError(error.message));
        dispatch(setTasksStatus(QueryStatusEnum.failed));
      },
      onSettled: () => {
        dispatch(setTasksStatus(QueryStatusEnum.idle));
      },
    }
  );
};
