import { QueryStatusEnum, Task, TaskEvidence } from '@/utils/types/index';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface TasksState {
  tasks: Task[];
  evidence: TaskEvidence[];
  status: QueryStatusEnum;
  error: string | null;
}

const initialState: TasksState = {
  tasks: [],
  evidence: [],
  status: QueryStatusEnum.idle,
  error: null,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks(state, action: PayloadAction<Task[]>) {
      state.tasks = action.payload;
    },
    setTaskEvidence(state, action: PayloadAction<TaskEvidence[]>) {
      state.evidence = action.payload;
    },
    addTaskEvidence(state, action: PayloadAction<TaskEvidence>) {
      state.evidence.push(action.payload);
    },
    setTasksStatus(state, action: PayloadAction<QueryStatusEnum>) {
      state.status = action.payload;
    },
    setTasksError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
});

export const {
  setTasks,
  setTaskEvidence,
  addTaskEvidence,
  setTasksStatus,
  setTasksError,
} = tasksSlice.actions;
export default tasksSlice.reducer;
